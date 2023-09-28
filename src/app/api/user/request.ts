export class UserRequest {
  rules(data: UserPostData){
    const rulesTested = {
      "username": typeof data.username === 'string',
      "password": typeof data.username === 'string',
      "animeList": typeof data.username === 'string'
    }

    return Object.values(rulesTested).every(Boolean)
  }

  rulesUpdate(data: UserUpdateData){
    const rulesTested = {
      "username": typeof data.username === 'string',
      "animeList": typeof data.username === 'string'
    }

    return Object.values(rulesTested).every(Boolean)
  }

}