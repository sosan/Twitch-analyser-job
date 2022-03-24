const {sentry: {dsnUrl}} = require('../config')

class ErrorTracking {
  constructor({errorMetricSender}) {
    this.errorMetricSender = errorMetricSender;
  }

  init() {
    this.errorMetricSender.init({
      dsn: dsnUrl,
      tracesSampleRate: 1.0,
    });
  }
}

module.exports = ErrorTracking;
