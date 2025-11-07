type ScorePost = {
  songId: number;
  userId: number;
  value: number;
  videoTimeStamp: number;
}

type Score = {
  id: number;
  songId: number;
  user?: User;
  userId: number;
  value: number;
  videoTimeStamp: number;
  valid: number;
}

type FiltersQueryScore = BaseFilters & {
  songId?: number;
  userId?: number;
}

type ResultScores = {
  scores: Score[];
  count: number;
}