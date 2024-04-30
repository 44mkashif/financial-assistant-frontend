interface ErrorMessages {
  [key: string]: string;
}

export const ERROR_MESSAGES: ErrorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email',
  passwordMismatch: 'Passwords do not match',
  minLengthRequired: 'Password must be at least 6 characters long',
  uppercaseRequired: 'Password must contain at least one uppercase letter',
  lowercaseRequired: 'Password must contain at least one lowercase letter',
  specialCharRequired: 'Password must contain at least one special character'
};
