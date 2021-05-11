/**
 * Authentication error.
 */
export class AuthenticationError extends Error {
  /**
   * Error name.
   */
  name = 'AuthenticationError';

  /**
   * Constructs a new authentication error.
   *
   * @param message - Error message
   */
  constructor(message?: string) {
    super();
    Object.setPrototypeOf(this, AuthenticationError.prototype);
    this.message = message || 'Invalid username and/or password';
  }
}
