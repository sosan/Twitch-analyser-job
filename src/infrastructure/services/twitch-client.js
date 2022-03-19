const {twitch: {clientId, secretId, oauthUri, twitchApiUri}} = require('../config/');

class TwitchClient {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  async getTwitchUser(twitchUsername) {
    const requestTwitchToken = await this._getToken();

    const headers = this._headersWithToken(requestTwitchToken);
    const requestTwitchUserId = await this.httpClient.get(`${twitchApiUri}/users?login=${twitchUsername}`, {headers});


    if (requestTwitchUserId.data.data.length === 0) {
      return null;
    }

    return requestTwitchUserId.data.data[0];
  }

  async getCurrentStream(twitchUsername) {
    const requestTwitchToken = await this._getToken();

    const headers = this._headersWithToken(requestTwitchToken);
    const requestTwitchStream = await this.httpClient.get(`${twitchApiUri}/streams?user_login=${twitchUsername}`,
        {headers});

    if (requestTwitchStream.data.data.length === 0) {
      return null;
    }

    return requestTwitchStream.data.data[0];
  }

  async _getToken() {
    const requestTwitch = await this.httpClient
        .post(`${oauthUri}/token?client_id=${clientId}&client_secret=${secretId}&grant_type=client_credentials`);
    // eslint-disable-next-line
    const {data: {access_token}} = requestTwitch;

    // eslint-disable-next-line
    return access_token;
  }

  _headersWithToken(token) {
    return {
      'authorization': `Bearer ${token}`,
      'client-id': clientId,
    };
  }
}

module.exports = TwitchClient;
