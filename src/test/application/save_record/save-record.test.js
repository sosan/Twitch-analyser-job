const awilix = require('awilix');
const container = require('../../../container');

describe('Save Record', () => {
  let streamRepositoryMock;
  let saveRecord;

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    streamRepositoryMock = {
      add: jest.fn(),
    };

    container.register({
      streamRepository: awilix.asValue(streamRepositoryMock),
    });

    saveRecord = container.resolve('saveRecord');
  });

  test('should save a record without failing', async () => {
    const calledWith = {
      streamId: '11111',
      startedAt: '11-02-2022T23-12-22',
      ownerId: '222',
      categoryId: '44444',
      categoryName: 'Sad Stream',
      ownerName: 'SadStreamer',
      currentViewers: 444,
    };

    const generateKey = `stream:11111:44444:222:Sad%+#Stream`;
    const labels = {
      streamId: '11111',
      ownerId: '222',
      categoryId: '44444',
      categoryName: 'Sad%+#Stream',
    };

    await saveRecord.execute(calledWith);

    expect(streamRepositoryMock.add).toHaveBeenCalledTimes(1);
    expect(streamRepositoryMock.add).toHaveBeenCalledWith(generateKey, labels, 444);
  });
});
