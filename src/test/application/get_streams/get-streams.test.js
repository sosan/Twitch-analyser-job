const awilix = require('awilix');
const container = require('../../../container');
const GetStreamsCommand = require('../../../application/get_streams/get-streams-command');

describe('Get Streams', () => {
  let twitchClientMock;

  let getStreams;
  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    twitchClientMock = {
      getCurrentStream: jest.fn(),
    };
    container.register({
      twitchClient: awilix.asValue(twitchClientMock),
    });

    getStreams = container.resolve('getStreams');
  });

  test('should give metris if streamer is online', async () => {
    const twitchApiResponse = {
      id: '45004746428',
      user_id: '31919607',
      user_login: 'elxokas',
      user_name: 'elxokas',
      game_id: '21779',
      game_name: 'League of Legends',
      type: 'live',
      title: 'jugando hasta perder LUEGO EMPEZAMOS ZELDA !REDES',
      viewer_count: 21549,
      started_at: '2022-03-19T17:44:15Z',
      language: 'es',
      thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_elxokas-{width}x{height}.jpg',
      tag_ids: ['d4bb9c58-2141-4881-bcdc-3fe0505457d1'],
      is_mature: false,
    };
    twitchClientMock.getCurrentStream.mockReturnValue(twitchApiResponse);

    const expectedResponse = {
      isOnline: true,
      streamId: '45004746428',
      categoryId: '21779',
      categoryName: 'League of Legends',
      viewerCount: 21549,
      startedAt: '2022-03-19T17:44:15Z',
      isMature: false,
    };

    const command = new GetStreamsCommand({twitchUsername: 'elxokas'});
    const currentStreamMetrics = await getStreams.execute(command);

    expect(currentStreamMetrics).toEqual(expectedResponse);
    expect(twitchClientMock.getCurrentStream).toHaveBeenCalledTimes(1);
    expect(twitchClientMock.getCurrentStream).toHaveBeenCalledWith('elxokas');
  });

  test('should throw err when repository gives null values', async () => {
    twitchClientMock.getCurrentStream.mockReturnValue(null);

    const expectedResponse = {
      isOnline: false,
      streamId: null,
      categoryId: null,
      categoryName: null,
      viewerCount: null,
      startedAt: null,
      isMature: null,
    };

    const command = new GetStreamsCommand({twitchUsername: 'elxokas'});
    const currentStreamMetrics = await getStreams.execute(command);

    expect(currentStreamMetrics).toEqual(expectedResponse);
    expect(twitchClientMock.getCurrentStream).toHaveBeenCalledTimes(1);
    expect(twitchClientMock.getCurrentStream).toHaveBeenCalledWith('elxokas');
  });
});

/*

isOnline: true,
streamId: '45004746428',
categoryId: '21779',
categoryName: 'League of Legends',
viewerCount: 21549,
startedAt: '2022-03-19T17:44:15Z',
isMature: false

*/
