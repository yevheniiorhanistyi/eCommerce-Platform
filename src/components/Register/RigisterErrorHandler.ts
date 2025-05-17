import { ErrorObject, ErrorResponse } from '@commercetools/platform-sdk';

interface CommercetoolsError {
  body: ErrorResponse;
}

function handleRegError(error: unknown): Error {
  if (typeof error === 'object' && error !== null && 'body' in error) {
    const commercetoolsError = error as CommercetoolsError;
    const { statusCode, message, errors } = commercetoolsError.body;

    const duplicateEmail = errors?.find(
      (e: ErrorObject) => e.code === 'DuplicateField' && e.field === 'email'
    );
    if (duplicateEmail) {
      console.error('User with this email already exists');

      return new Error('User with this email already exists');
    }

    console.error(`Commercetools error ${statusCode}:`, message);

    return new Error(message || 'Commercetools error');
  }

  if (error instanceof Error) {
    return new Error(error.message || 'Unknown error');
  }

  return new Error('Something went wrong, try again.');
}

export default handleRegError;
