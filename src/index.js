require('dotenv').config();
require('./infrastructure/cron/twitch-cron');

const container = require('./container');

const gracefulStopper = container.resolve('gracefulStopper');
const errorTracking = container.resolve('errorTracking');

errorTracking.init();

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];
process.stdin.resume();
signals.forEach((signal) => process.on(signal, () => gracefulStopper.stopGracefully()));
