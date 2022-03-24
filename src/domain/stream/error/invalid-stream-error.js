const ApplicationError = require('../../application-error');

class InvalidStreamError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidStreamError';
  }
}

module.exports = InvalidStreamError;
