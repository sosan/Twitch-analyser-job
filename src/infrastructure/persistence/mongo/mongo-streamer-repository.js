const StreamerRepository = require('../../../domain/streamer/services/streamer-repository');
const STREAMERS = 'streamers';

class MongoStreamerRepository extends StreamerRepository {
  constructor({mongoDbHandler, muuid, streamerDocumentParser}) {
    super();
    this.mongoDbHandler = mongoDbHandler;
    this.muuid = muuid;
    this.streamerDocumentParser = streamerDocumentParser;
  }

  async findAll() {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const documents = await db.collection(STREAMERS).find({}).toArray();
      return documents.length === 0 ? null :
        documents.map((document) => this.streamerDocumentParser.toDomain(document));
    } catch ({message}) {
      throw new Error(message);
    }
  }

  async save(streamer) {
    const db = await this.mongoDbHandler.getInstance();
    try {
      const document = this.streamerDocumentParser.toDocument(streamer);
      await db.collection(STREAMERS).insertOne(document);
    } catch ({message}) {
      throw new Error(message);
    }
  }
}

module.exports = MongoStreamerRepository;
