const env = process.env.NODE_ENV;

const run = {
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    secretId: process.env.TWITCH_SECRET_ID,
    oauthUri: process.env.TWITCH_OAUTH_URI,
    twitchApiUri: process.env.TWITCH_API_URI,
  },
  mongo: {
    mongoConnectionUri: 'mongodb://db:27017',
    dbName: 'twitch-analyser',
    timeout: 5000,
  }
};

const test = {
  twitch: {
    clientId: 'clientId_MOCK',
    secretId: 'secretId_MOCK',
    oauthUri: 'oauthUri_MOCK',
    twitchApiUri: 'twitchApiUri_MOCK',
  },
  mongo: {
    mongoConnectionUri: 'mongoConnectionUri_MOCK',
    dbName: 'dbName_MOCK',
    timeout: 5000,
  }
};

const config = {
  run,
  test,
};

module.exports = config[env];
