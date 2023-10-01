/*
  Convert a score from database to Score Model defined on src/models
*/
export function convertDbScoreToModel(data: any) : Score{
  return {
    id: data.id,
    songId: data.songId,
    userId: data.userId,
    value: data.value,
    videoTimeStamp: data.videoTimeStamp,
    valid: data.valid
  }
}