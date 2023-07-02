const AuthErrorResponseMessage = {
  USERNAME_IS_ALREADY_EXISTED: 'USERNAME_IS_ALREADY_EXISTED',
};

const CountryErrorResponseMessage = {
  COUNTRY_WAS_NOT_FOUND: 'COUNTRY_WAS_NOT_FOUND',
};

const UserErrorResponseMessage = {
  USER_WAS_NOT_FOUND: 'USER_WAS_NOT_FOUND',
  CANNOT_CREATE_USER: 'CANNOT_CREATE_USER',
};

export const ErrorResponseMessage = {
  ...AuthErrorResponseMessage,
  ...CountryErrorResponseMessage,
  ...UserErrorResponseMessage,
  SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
};
