import { ValidationValueMessage } from 'react-hook-form';

export const EMAIL_PATTERN: ValidationValueMessage<RegExp> = {
  value:
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: 'Invalid email',
};
