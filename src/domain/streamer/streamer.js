const InvalidStreamerError = require('./error/invalid-streamer-error');

class Streamer {
  constructor({id, idTwitch, name}) {
    this.id = id;
    this.name = name;
    this.idTwitch = idTwitch;
  }

  set id(id) {
    if (!id) {
      throw new InvalidStreamerError('Field id cannot be empty');
    }

    this._id = id;
  }

  get id() {
    return this._id;
  }

  set idTwitch(idTwitch) {
    if (!idTwitch) {
      throw new InvalidStreamerError('Field idTwitch cannot be empty');
    }

    this._idTwitch = idTwitch;
  }

  get idTwitch() {
    return this._idTwitch;
  }

  set name(name) {
    if (!name) {
      throw new InvalidStreamerError('Field name cannot be empty');
    }

    this._name = name;
  }

  get name() {
    return this._name;
  }

}

module.exports = Streamer;
