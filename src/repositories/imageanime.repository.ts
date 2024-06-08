/*
  Convert a score from database to Score Model defined on src/models
*/
export function convertDbImageAnimeToModel(data: any) : ImageAnime{
  return {
    id: data.id,
    link: data.link,
    anilistLink: data.anilistLink ? data.anilistLink : null,
    animeName: data.animeName ? data.animeName : null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}