const awilix = require('awilix');
const gracefulStopper = require('./infrastructure/graceful-stopper');
const axios = require('axios');
const twitchClient = require('./infrastructure/services/twitch-client');
const cron = require('node-cron');
const MUUID = require('uuid-mongodb');
const {v4: uuidv4} = require('uuid');
const MongoStreamerDocumentParser = require('./infrastructure/persistence/mongo/mongo-stream-document-parser');
const {MongoClient: mongo} = require('mongodb');
const MongoDbHandler = require('./infrastructure/persistence/mongo/mongo-db-handler');
const MongoStreamerRepository = require('./infrastructure/persistence/mongo/mongo-streamer-repository');
const getStreamers = require('./application/get_streamers/');
const getStreams = require('./application/get_streams/');
const RedisDbHandler = require('./infrastructure/persistence/redis_timeseries/redis-db-handler');
const redisTimeseries = require('redistimeseries-js');
const RedisStreamRepository = require('./infrastructure/persistence/redis_timeseries/redis-stream-repository');
const saveRecord = require('./application/save_record/');
const sentry = require('@sentry/node');
const errorTracking = require('./infrastructure/services/error-tracking');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  gracefulStopper: awilix.asFunction(gracefulStopper),
  httpClient: awilix.asValue(axios),
  twitchClient: awilix.asClass(twitchClient),
  cron: awilix.asValue(cron),
  muuid: awilix.asValue(MUUID),
  uuidv4: awilix.asValue(uuidv4),
  streamerDocumentParser: awilix.asClass(MongoStreamerDocumentParser),
  mongo: awilix.asValue(mongo),
  mongoDbHandler: awilix.asClass(MongoDbHandler).singleton(),
  streamerRepository: awilix.asClass(MongoStreamerRepository),
  getStreamers: awilix.asClass(getStreamers),
  getStreams: awilix.asClass(getStreams),
  redisDbHandler: awilix.asClass(RedisDbHandler),
  redisTimeseries: awilix.asValue(redisTimeseries),
  streamRepository: awilix.asClass(RedisStreamRepository),
  saveRecord: awilix.asClass(saveRecord),
  errorMetricSender: awilix.asValue(sentry),
  errorTracking: awilix.asClass(errorTracking),
});

module.exports = container;
