import { useCallback } from 'react';
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

export const splitName = (name: string) => {
  const nameParts = name.trim().split(' ');

  // If there's only one name part, consider it as the first name and set last name as an empty string.
  let firstName = nameParts[0];
  let lastName = '';

  // If there are more than one name parts, extract the last part as the last name.
  if (nameParts.length > 1) {
    lastName = nameParts.pop() || ''; // Remove the last name part from the array and set it as the last name.
    firstName = nameParts.join(' '); // Rejoin the remaining parts as the first name.
  }

  return {
    firstName,
    lastName,
  };
};

export const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );

// Export the utility functions as an object
const CommonUtil = {
  setTokenCookies,
  clearRefreshToken,
  setRefreshTokenCookies,
  userLoggedIn,
  clearSession,
  emailRegex,
  useYupValidationResolver,
  splitName,
};

export default CommonUtil;
