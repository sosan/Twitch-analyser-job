const {redisTimeSeries: {host, port}} = require('../../config');

class RedisDbHandler {
  constructor({redisTimeseries}) {
    // eslint-disable-next-line
    this.redisTimeseries = new redisTimeseries({host, port});
  }

  async _connect() {
    try {
      await this.redisTimeseries.connect();

      return this.redisTimeseries;
    } catch (err) {
      const error = err.message ? err.message : err;
      console.log(error);
      console.error(`Error in database connection: ${error}`);
      throw new Error(`Error in database connection: ${error}`);
    }
  }

  async getInstance() {
    if (!this.instance) {
      this.instance = await this._connect();
    }
    return this.instance;
  }
}

module.exports = RedisDbHandler;
