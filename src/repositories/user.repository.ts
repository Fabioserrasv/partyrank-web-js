export const PROFILE_PICTURE_PERMITED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png"
]

function convertDbUsersOn(data: any): UserOn{
  return {
    songSet: data.songSet,
    accepted: data.accepted,
    user: data.username
  }
}

export function convertDbUserToModel(dbUser: any): User {
  return {
    id: dbUser.id,
    username: dbUser.username,
    animeList: dbUser.animeList,
    admin: dbUser.admin,
    scores: dbUser.scores,
    invites: dbUser.SongSetsOn && dbUser.SongSetsOn.length > 0 ? dbUser.SongSetsOn.map(convertDbUsersOn) : [],
    imageUrl: dbUser.imageUrl
  }
}