const InvalidStreamError = require('./error/invalid-stream-error');
const Record = require('./record');

class Stream {
  constructor({id, startedAt, ownerId, records}) {
    this.id = id;
    this.startedAt = startedAt;
    this.ownerId = ownerId;
    this.records = records.map((record) => new Record({
      categoryId: record.categoryId,
      categoryName: record.categoryName,
      currentViewers: record.currentViewers,
    }));
  }

  set id(id) {
    if (!id) {
      throw new InvalidStreamError('Field id cannot be empty');
    }

    this._id = id;
  }

  get id() {
    return this._id;
  }

  set startedAt(startedAt) {
    if (!startedAt) {
      throw new InvalidStreamError('Field startedAt cannot be empty');
    }

    this._startedAt = startedAt;
  }

  get startedAt() {
    return this._startedAt;
  }

  set ownerId(ownerId) {
    if (!ownerId) {
      throw new InvalidStreamError('Field ownerId cannot be empty');
    }

    this._ownerId = ownerId;
  }

  get ownerId() {
    return this._ownerId;
  }

  set records(records) {
    if (!records || records.length === 0) {
      throw new InvalidStreamError('Field records cannot be empty');
    }

    this._records = records;
  }

  get records() {
    return this._records;
  }
}

module.exports = Stream;
