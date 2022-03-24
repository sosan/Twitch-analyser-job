
class SaveRecord {
  constructor({streamRepository}) {
    this.streamRepository = streamRepository;
  }

  async execute({streamId, startedAt, ownerId, categoryId, categoryName, ownerName, currentViewers}) {
    const generateKey = `stream:${streamId}:${categoryId}:${ownerId}:${this._replaceSpaces(categoryName)}`;
    const labels = {streamId, ownerId, categoryId, categoryName: this._replaceSpaces(categoryName)};

    this.streamRepository.add(generateKey, labels, currentViewers);
  }

  _replaceSpaces(str) {
    return str.split(' ').join('%+#');
  }
}

module.exports = SaveRecord;
