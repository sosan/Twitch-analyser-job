const cron = require('node-cron');
const container = require('../../container');
const {cron: {tenSeconds}} = require('../config/');

const getStreamers = container.resolve('getStreamers');
const getStreams = container.resolve('getStreams');
const saveRecord = container.resolve('saveRecord');

const GetStreamsCommand = require('../../application/get_streams/get-streams-command');
const SaveRecordCommand = require('../../application/save_record/save-record-command');


cron.schedule(tenSeconds, async () => {
  try {
    const {streamers} = await getStreamers.execute();

    for (streamer of streamers) {
      const getStreamsCommand = new GetStreamsCommand({twitchUsername: streamer.streamerName});
      const currentStream = await getStreams.execute(getStreamsCommand);

      if (currentStream.isOnline) {
        const saveRecordCommand = new SaveRecordCommand({
          streamId: currentStream.streamId,
          startedAt: currentStream.startedAt,
          ownerId: streamer.streamerId,
          ownerName: streamer.streamerName,
          categoryId: currentStream.categoryId,
          categoryName: currentStream.categoryName,
          currentViewers: currentStream.viewerCount,
        });

        await saveRecord.execute(saveRecordCommand);
        // eslint-disable-next-line max-len
        console.log(`=> ${streamer.streamerName} is streaming ${currentStream.categoryName}, with: ${currentStream.viewerCount} viewers`);
      }
    }
  } catch (err) {
    console.log('::err', err);
  }
});
