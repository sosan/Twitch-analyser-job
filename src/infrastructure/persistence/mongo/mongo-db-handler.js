const {mongo: {mongoConnectionUri, dbName, timeout}} = require('../../config');
const STREAMS = 'streams';

class MongoDbHandler {
  constructor({mongo}) {
    this.mongo = mongo;
  }
  async _connect() {
    try {
      this.client = await this.mongo.connect(mongoConnectionUri,
          {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: timeout});
      const db = await this.client.db(dbName);

      db.collection(STREAMS).createIndex({'name': 1}, {name: 'name'}, (err, result) => {
        if (err) {
          console.log(`There was an error while creating name index due to: ${err}`);
        }
        console.log(`Index created: ${result}`);
      });

      return db;
    } catch (err) {
      const error = err.message ? err.message : err;
      console.log(error)
      console.error(`Error in database connection: ${error}`);
      throw new Error(`Error in database connection: ${error}`);
    }
  }

  async _createInstance() {
    return await this._connect();
  }

  async getInstance() {
    if (!this.instance) {
      this.instance = await this._createInstance();
    }
    return this.instance;
  }

  disconnect() {
    if (this.client) {
      this.client.close();
    }
    this.instance = null;
    this.client = null;
  }
}

module.exports = MongoDbHandler;
