type SongSetPostData = {
  id?: number;
  name: string;
  status?: SongSetStatus;
  type?: SongSetType;
}

type SongSetStatus = "RECRUITING" | "ON_GOING" | "PROCESSING" | "FINISHED" | "PAUSED"
type SongSetType = "PRIVATE" | "PUBLIC"

type SongSet = {
  id: number;
  name: string;
  songs: Song[];
  type: SongSetType;
  status: SongSetStatus;
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
}

// Changed json format for generating images, need to change on party-rank-video-generator

type ScoreNote = {
  participant: string;
  value: number;
}

type JsonToGenerateImages = {
  title: string;
  participants: string[];
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