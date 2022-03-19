const cron = require('node-cron');
const container = require('../../container');
const httpTwitch = container.resolve('twitchClient');
const streamerRepository = container.resolve('streamerRepository');


cron.schedule('*/10 * * * * *', async date => {
  const streamers = await streamerRepository.findAll();
  console.log(`=> Starting cron at: ${date}`)
  for (streamer of streamers) {
    const currentStream = await httpTwitch.getCurrentStream(streamer.name)
    console.log(`=> Streamer: ${streamer.name}, Status: ${currentStream ? 'ONLINE' : 'OFFLINE'}`)
  }
});

