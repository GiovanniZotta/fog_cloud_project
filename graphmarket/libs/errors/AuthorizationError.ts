/**
 * Authorization error.
 */
export class AuthorizationError extends Error {
  /**
   * Error name.
   */
  name = 'AuthorizationError';

  /**
   * Constructs a new Authorization error.
   *
   * @param message - Error message
   */
  constructor(message?: string) {
    super();
    Object.setPrototypeOf(this, AuthorizationError.prototype);
    this.message = message || 'Insufficient permissions';
  }
}
