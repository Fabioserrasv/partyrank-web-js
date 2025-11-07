type SongSetPostData = {
  id?: number;
  name: string;
  anilistLink?: string;
  status?: SongSetStatus;
  type?: SongSetType;
  scoreSystem?: SongSetScoreSystemType;
}

type SongSetStatus = "RECRUITING" | "ON_GOING" | "PROCESSING" | "FINISHED" | "PAUSED"
type SongSetType = "PRIVATE" | "PUBLIC"
type SongSetScoreSystemType = "RANKING" | "SCORING" | "SCORING_AVERAGE"

type SongSet = {
  id: number;
  name: string;
  anilistLink: string;
  coverImage?: string;
  isPlaceholder?: boolean;
  songs: Song[];
  type: SongSetType;
  status: SongSetStatus;
  scoreSystem: SongSetScoreSystemType;
  user?: User;
  usersOn?: UserOn[];
  generateImageObject?: JsonToGenerateImages;
  generateVideoObject?: JsonToGenerateVideo[];
  createdAt?: Date;
  updatedAt?: Date;
}

type UserOn ={
  songSet: SongSet;
  user: User;
  accepted: boolean;
  imageUrl?: string;
}

// Changed json format for generating images, need to change on party-rank-video-generator

type ScoreNote = {
  participant: string;
  value: number;
}

type JsonUserImages = {
  id: number;
  nome: string;
}

type JsonToGenerateImages = {
  title: string;
  participants: JsonUserImages[];
  series: Array<{
    type: string,
    anime: string,
    song: string,
    scores: ScoreNote[] | null,
    average: number,
    cover: string
  }>
}

type JsonToGenerateVideo = {
  image_path: string;
  video_path: string;
  cut_time: number[];
}

type FiltersQuerySongSet = BaseFilters & {
  name?: string;
  creatorName?: string;
  status?: SongSetStatus;
  systemType?: SongSetScoreSystemType;
} 

type ResultSongSets = {
  sets: SongSet[];
  count: number;
}