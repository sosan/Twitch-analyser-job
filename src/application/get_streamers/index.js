const StreamerNotFoundError = require('../../domain/streamer/error/streamer-not-found-error');
const GetStreamersReponse = require('./get-streamers-response');

class GetStreamers {
  constructor({streamerRepository}) {
    this.streamerRepository = streamerRepository;
  }

  async execute() {
    const allStreamers = await this.streamerRepository.findAll();
    this._checkIfStreamersExists(allStreamers);

    const streamers = allStreamers.map((streamer) => {
      return {
        streamerName: streamer.name,
        streamerId: streamer.idTwitch,
      };
    });
    return new GetStreamersReponse({streamers});
  }

  _checkIfStreamersExists(streamers) {
    if (!streamers || streamers.length === 0) {
      throw new StreamerNotFoundError('Streamers not found');
    }
  }
}

module.exports = GetStreamers;
