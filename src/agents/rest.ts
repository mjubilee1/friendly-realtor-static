/**
 * Uses fetch to support ajax requests.
 */
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { debounce } from 'lodash';
import jwt from 'jwt-decode';
import moment from 'moment';
import Cookies from 'js-cookie';
import { AxiosRequestHeaders, AxiosRequestConfig, ResponseType, UserToken } from './agentTypes';
import { clearRefreshToken, setTokenCookies, clearSession } from '../utils/commonUtil';

const serverApiBaseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
const token: string = Cookies.get('jwt');

let retry401 = false;
let retry403 = false;
let checkingForValidToken = false;

// We will send along these headers with each request
export const getHeaders = (additionalHeaders?: AxiosRequestHeaders) => {
  const globalHeaders: Record<string, string> = {};

  if (token) {
    globalHeaders.Authorization = `Bearer ${token}`;
  }

  return { ...globalHeaders, ...additionalHeaders };
};

// Setup an interceptor to handle error responses
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Redirect if we received a 401
      if (error.response.status === 401 /* && !window.location.hostname.match(/^localhost$/) */) {
        const userToken: UserToken = jwt(token);
        const hasValidJwt = userToken.exp && userToken.exp > moment().unix();
        if (hasValidJwt && !retry401) {
          retry401 = true;
          return axios.request(error.config).then((response) => {
            retry401 = false;
            return response;
          }); // NO catch -- Should go through this same interceptor and log user out if 401 or return other errors
        }
      }

      // If 403, retry once
      if (error.response.status === 403) {
        if (!retry403) {
          retry403 = true;
          return axios.request(error.config).then((response) => {
            if (response && response.data && response.data.error) {
              retry403 = false;
              return Promise.reject(error);
            }
            retry403 = false;
            return response;
          });
        }
        // retry403 was set, so we were already retrying once.
        // If here, assumed the retry failed. Return error response and reset var for next potential 403
        retry403 = false;
      }
    }
    return Promise.reject(error);
  },
);

function logout() {
  axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/logout`,
    headers: { Authorization: `Bearer ${Cookies.get('jwt')}` },
  }).finally(() => {
    clearSession();
    window.location.href = '/';
  });
}

function isValidToken() {
  if (checkingForValidToken || !Cookies.get('jwt')) {
    return; // we only want to check once or if user is not logged in.
  }
  const threshold = 7200; // 2 hours
  const refreshToken: string = Cookies.get('refreshToken');
  const userToken: UserToken = jwt(token);
  const timeStamp = moment().unix();
  checkingForValidToken = true;
  if (userToken.exp) {
    const difference = userToken.exp - timeStamp;
    if (difference < 0 && difference <= threshold) {
      // If we have a refresh token, proceed
      if (refreshToken) {
        const axiosRefresh: AxiosRequestConfig<Record<string, unknown>> = {
          method: 'post',
          url: `${serverApiBaseURL}/auth/token/refresh`,
          data: { token: refreshToken },
          headers: getHeaders(),
        };
        // Go get a new token!
        axios(axiosRefresh)
          .then((response) => {
            const { jwt: userJwt } = response.data;
            clearRefreshToken();
            if (userJwt) {
              setTokenCookies(response.data.jwt);
            }
          })
          .catch(() => {
            checkingForValidToken = false;
            logout();
          });
        checkingForValidToken = true;
      } else {
        // If no refresh token, log user out -- Expired
        logout();
      }
    } else {
      checkingForValidToken = false;
    }
  }
}

const debouncedIsValidToken: () => void = debounce(isValidToken, 2000); // Check for valid token every time we make a logged in request

// Make a request, but first, check to see if the jwt token will expire soon.
export const makeRequest = (config: AxiosRequestConfig): AxiosPromise => {
  config.headers = getHeaders();

  // Call the function to ensure that we have a recently refreshed token
  debouncedIsValidToken();

  return axios(config);
};

const requests = {
  get: (url: string, responseType?: ResponseType) =>
    makeRequest({ method: 'get', url, responseType }),
  post: (url: string, data?: Record<string, unknown>) => makeRequest({ method: 'post', url, data }),
  put: (url: string, data?: Record<string, unknown>) => makeRequest({ method: 'put', url, data }),
  delete: (url: string, responseType?: ResponseType) =>
    makeRequest({ method: 'delete', url, responseType }),
};

export const auth = {
  getToken: () => requests.get(`${serverApiBaseURL}/v1/token`),
  logout: () => requests.post(`${serverApiBaseURL}/v1/logout`),
};

export const user = {
  newSubscriber: (data: any) => {
    const { emailAddress, firstName, lastName } = data;
    const queryParams = `?emailAddress=${encodeURIComponent(
      emailAddress,
    )}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
    return requests.post(`${serverApiBaseURL}/new-subscriber${queryParams}`);
  },
  submitCreditReport: (id, data) => requests.post(`${serverApiBaseURL}/credit-report/${id}`, data),
  prompt: (data) => requests.post(`${serverApiBaseURL}/prompt`, data),
};
