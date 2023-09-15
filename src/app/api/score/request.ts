export class ScoreRequest {
  rules(data: ScorePost){
    const rulesTested = {
      "value": typeof data.value === 'number'
    }

    return Object.values(rulesTested).every(Boolean)
  }
}