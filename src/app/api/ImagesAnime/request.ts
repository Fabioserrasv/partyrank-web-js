export class ImageAnimesRequest {
  rules(data: ImageAnimePost){
    const rulesTested = {
      "link": typeof data.link === 'string'
    }

    return Object.values(rulesTested).every(Boolean)
  }
}