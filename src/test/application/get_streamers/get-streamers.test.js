const awilix = require('awilix');
const container = require('../../../container');
const Streamer = require('../../../domain/streamer/streamer');
const StreamerNotFoundError = require('../../../domain/streamer/error/streamer-not-found-error');

describe('Get Streamers', () => {
  let streamerRepositoryMock;

  let getStreamers;
  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    streamerRepositoryMock = {
      findAll: jest.fn(),
    };
    container.register({
      streamerRepository: awilix.asValue(streamerRepositoryMock),
    });

    getStreamers = container.resolve('getStreamers');
  });

  test('should get a list of streamers', async () => {
    const mockStreamerDomain = new Streamer({
      id: 'ffbd8683-a72c-4d64-a053-8b9ecec25c4f',
      name: 'sampleStreamer',
      idTwitch: '0000000',
    });

    const expectedResponse = {streamers: [{
      streamerId: '0000000',
      streamerName: 'sampleStreamer',
    }]};

    streamerRepositoryMock.findAll.mockReturnValue([mockStreamerDomain]);

    const listStreamers = await getStreamers.execute();

    expect(listStreamers).toEqual(expectedResponse);
    expect(streamerRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(streamerRepositoryMock.findAll).toHaveBeenCalledWith();
  });

  test('should throw err when streamer list is null', async () => {
    streamerRepositoryMock.findAll.mockReturnValue(null);
    const expectedError = 'Streamers not found';

    try {
      await getStreamers.execute();
    } catch (err) {
      expect(err instanceof StreamerNotFoundError).toBeTruthy();
      expect(err.message).toEqual(expectedError);
    }

    expect(streamerRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(streamerRepositoryMock.findAll).toHaveBeenCalledWith();
  });

  test('should throw err when streamer list is empty', async () => {
    streamerRepositoryMock.findAll.mockReturnValue([]);
    const expectedError = 'Streamers not found';

    try {
      await getStreamers.execute();
    } catch (err) {
      expect(err instanceof StreamerNotFoundError).toBeTruthy();
      expect(err.message).toEqual(expectedError);
    }

    expect(streamerRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(streamerRepositoryMock.findAll).toHaveBeenCalledWith();
  });
});

