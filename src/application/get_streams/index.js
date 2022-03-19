const GetStreamsReponse = require('./get-streams-response');

class GetStreams {
  constructor({twitchClient}) {
    this.twitchClient = twitchClient;
  }

  async execute({twitchUsername}) {
    const currentStream = await this.twitchClient.getCurrentStream(twitchUsername);
    const streamerStatus = this._streamerIsOnline(currentStream);
    return new GetStreamsReponse({data: currentStream, isOnline: streamerStatus});
  }

  _streamerIsOnline(stream) {
    if (!stream) {
      return false;
    }

    return true;
  }
}

module.exports = GetStreams;
