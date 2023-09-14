export class SongRequest {
  rules(data: SongPostData){
    const rulesTested = {
      "name": typeof data.name === 'string'
    }

    return Object.values(rulesTested).every(Boolean)
  }
}