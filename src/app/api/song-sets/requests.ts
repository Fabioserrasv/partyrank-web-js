export class SongSetRequest {
  rules(data: SongSetPostData){
    const rulesTested = {
      "name": typeof data.name === 'string'
    }

    return Object.values(rulesTested).every(Boolean)
  }
}