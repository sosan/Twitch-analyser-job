const cron = require('node-cron');
const container = require('../../container');
const httpTwitch = container.resolve('twitchClient');

const getStreamers = container.resolve('getStreamers');
const getStreams = container.resolve('getStreams');

const GetStreamsCommand = require('../../application/get_streams/get-streams-command');


cron.schedule('*/10 * * * * *', async date => {
  const { streamerNames } = await getStreamers.execute();
  console.log(`=> Starting cron at: ${date}`);

  for (streamer of streamerNames) {
    try {
      const getStreamsCommand = new GetStreamsCommand({twitchUsername: streamer})
      const currentStream = await getStreams.execute(getStreamsCommand)
      console.log(currentStream)
    } catch (err) {
      console.log('::err',err);
    }
  }

});

