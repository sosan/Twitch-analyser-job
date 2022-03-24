class RedisStreamRepository {
  constructor({redisDbHandler, streamerDocumentParser}) {
    this.redisDbHandler = redisDbHandler;
    this.streamerDocumentParser = streamerDocumentParser;
  }

  async add(key, labels, value) {
    const db = await this.redisDbHandler.getInstance();
    try {
      await db
          .add(key, Date.now(), value)
          .labels(labels)
          .send();
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async _infoAboutKey(key) {
    const db = await this.redisDbHandler.getInstance();
    try {
      const keyExists = await db.info(key).send();

      if (keyExists) {
        return true;
      }

      return false;
    } catch ({message}) {
      if (message.includes('key does not exist')) {
        return false;
      }

      console.log(message);
    }
  }
}

module.exports = RedisStreamRepository;
