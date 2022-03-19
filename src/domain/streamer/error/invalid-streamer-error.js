const ApplicationError = require('../../application-error');

class InvalidStreamerError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidStreamerError';
  }
}

module.exports = InvalidStreamerError;
