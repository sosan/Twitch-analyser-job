const { twitch: { clientId, secretId, oauthUri, twitchApiUri } } = require('../config/')

class TwitchClient {
  constructor({ httpClient }) {
    this.httpClient = httpClient;
  }

  async getTwitchUser(TwitchUsername) {
    const requestTwitchToken = await this._getToken();

    const headers = this._headersWithToken(requestTwitchToken);
    const requestTwitchUserId = await this.httpClient.get(`${twitchApiUri}/users?login=${TwitchUsername}`, { headers });

    
    if(requestTwitchUserId.data.data.length === 0){
      return null
    }

    return requestTwitchUserId.data.data[0];
  }

  async getCurrentStream(TwitchUsername) {
    const requestTwitchToken = await this._getToken();

    const headers = this._headersWithToken(requestTwitchToken);
    const requestTwitchStream = await this.httpClient.get(`${twitchApiUri}/streams?user_login=${TwitchUsername}`, { headers });

    if(requestTwitchStream.data.data.length === 0){
      return null
    }

    return requestTwitchStream.data;
  }

  async _getToken() {
    const requestTwitch = await this.httpClient.post(`${oauthUri}/token?client_id=${clientId}&client_secret=${secretId}&grant_type=client_credentials`);
    const { data: { access_token } } = requestTwitch;

    return access_token;
  }

  _headersWithToken(token) {
    return {
      'authorization': `Bearer ${token}`,
      'client-id': clientId,
    }
  }

}

module.exports = TwitchClient;
