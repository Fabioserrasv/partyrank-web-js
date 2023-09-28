export function convertDbSongToModel(data: any) {
  return {
    id: data.id,
    songSet: data.songSet,
    anime: data.anime,
    artist: data.artist,
    name: data.name,
    link: data.link,
    type: data.type,
    scores: data.scores,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function convertType(type: string): SongType {
  enum SongType {
    OPENING = "OPENING",
    ENDING = "ENDING",
    INSERT_SONG = "INSERT_SONG"
  }

  return type as SongType
}