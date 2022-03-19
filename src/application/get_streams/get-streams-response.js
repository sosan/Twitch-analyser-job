class GetStreamsResponse {
  constructor({data, isOnline}) {
    this.isOnline = isOnline;
    this.streamId = data ? data.id : null;
    this.categoryId = data ? data.game_id : null;
    this.categoryName = data ? data.game_name : null;
    this.viewerCount = data ? data.viewer_count : null;
    this.startedAt = data ? data.started_at : null;
    this.isMature = data ? data.is_mature : null;
  }
}

module.exports = GetStreamsResponse;
