const ApplicationError = require('../../application-error');

class StreamerNotFoundError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'StreamerNotFoundError';
  }
}

module.exports = StreamerNotFoundError;
