import Cookies from 'js-cookie';

export const setRefreshTokenCookies = (refreshToken: string): void => {
  Cookies.set('refreshToken', refreshToken);
  Cookies.set('sessionToken', refreshToken);
};

export const setTokenCookies = (token: string): void => {
  Cookies.set('jwt', token);
  Cookies.set('sessionToken', token);
};

export const clearRefreshToken = (): void => {
  Cookies.remove('refreshToken');
};

export const userLoggedIn = (): boolean => Cookies.get('jwt');

export const clearSession = (): void => {
  setTokenCookies('');
  clearRefreshToken();
  Cookies.remove('jwt');
  localStorage.removeItem('user-meta');
  localStorage.removeItem('team-meta');
};

export const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

// Export the utility functions as an object
const CommonUtil = {
  setTokenCookies,
  clearRefreshToken,
  setRefreshTokenCookies,
  userLoggedIn,
  clearSession,
  emailRegex,
};

export default CommonUtil;
