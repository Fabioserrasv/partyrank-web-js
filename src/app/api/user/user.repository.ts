export function convertDbUserToModel(dbUser: any): User {
  return {
    id: dbUser.id,
    username: dbUser.username,
    animeList: dbUser.animeList,
    admin: dbUser.admin
  }
}