class SaveRecordCommand {
  constructor({streamId, startedAt, ownerId, ownerName, categoryId, categoryName, currentViewers}) {
    this.streamId = streamId;
    this.startedAt = startedAt;
    this.ownerId = ownerId;
    this.ownerName = ownerName;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.currentViewers = currentViewers;
  }
}

module.exports = SaveRecordCommand;
