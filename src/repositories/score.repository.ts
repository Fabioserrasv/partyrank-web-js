export function convertDbScoreToModel(data: any) {
  return {
    id: data.id,
    songId: data.songId,
    userId: data.userId,
    value: data.value,
    videoTimeStamp: data.videoTimeStamp,
    valid: data.valid
  }
}