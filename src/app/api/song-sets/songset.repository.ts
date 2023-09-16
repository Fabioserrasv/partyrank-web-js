export function convertDbSongToModel(data: any) : Song{
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

export function convertDbSetToModel(data: any) : SongSet{
  return {
    name: data.name,
    songs: data.songs !== undefined && data.songs.length > 0 ? data.songs.map(convertDbSongToModel) : [],
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}