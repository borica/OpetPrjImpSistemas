
import { ValidationError } from 'yup';

interface Errors {
  [error: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const ValidationErrors: Errors = {};

  err.inner.forEach((error) => {
    if (error.path) {
      ValidationErrors[error.path] = error.message;
    }
  });

  return ValidationErrors;
}
