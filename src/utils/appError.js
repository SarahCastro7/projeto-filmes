export class appError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.name = 'appError';
    this.statusCode = 'statusCode';
    this.isOperational = true;
    this.message = message;
  }
}
