const InvalidStreamError = require('./error/invalid-stream-error');

class Record {
  constructor({categoryId, categoryName, currentViewers}) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.currentViewers = currentViewers;
  }

  set categoryId(categoryId) {
    if (!categoryId) {
      throw new InvalidStreamError('Field categoryId cannot be empty');
    }

    this._categoryId = categoryId;
  }

  get categoryId() {
    return this._categoryId;
  }

  set categoryName(categoryName) {
    if (!categoryName) {
      throw new InvalidStreamError('Field categoryName cannot be empty');
    }

    this._categoryName = categoryName;
  }

  get categoryName() {
    return this._categoryName;
  }

  set currentViewers(currentViewers) {
    if (!currentViewers) {
      throw new InvalidRecordError('Field currentViewers cannot be empty');
    }

    this._currentViewers = currentViewers;
  }

  get currentViewers() {
    return this._currentViewers;
  }
}

module.exports = Record;
