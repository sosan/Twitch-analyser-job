const DocumentParser = require('./document-parser');
const Streamer = require('../../../domain/streamer/streamer');

class MongoStreamerDocumentParser extends DocumentParser {
  constructor({muuid}) {
    super();
    this.muuid = muuid;
  }

  toDomain(document) {
    return new Streamer({
      id: this.muuid.from(document._id).toString(),
      name: document.name,
      idTwitch: document.idTwitch,
    });
  }

  toDocument(domain) {
    return {
      _id: this.muuid.from(domain._id),
      name: domain._name,
      idTwitch: domain._idTwitch,
    };
  }
}

module.exports = MongoStreamerDocumentParser;
