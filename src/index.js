require('dotenv').config();

const twitchCron = require('./infrastructure/cron/twitch-cron');
const container = require('./container');

const gracefulStopper = container.resolve('gracefulStopper');

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];
process.stdin.resume();
signals.forEach((signal) => process.on(signal, () => gracefulStopper.stopGracefully()));


