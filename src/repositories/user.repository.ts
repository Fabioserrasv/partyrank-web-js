export const PROFILE_PICTURE_PERMITED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png"
]

export function convertDbUserToModel(dbUser: any): User {
  return {
    id: dbUser.id,
    username: dbUser.username,
    animeList: dbUser.animeList,
    admin: dbUser.admin,
    scores: dbUser.scores,
    imageUrl: dbUser.imageUrl
  }
}