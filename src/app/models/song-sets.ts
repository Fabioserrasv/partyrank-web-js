type SongSetPostData = {
  name: string;
}

type SongSet = {
  name: string;
  songs?: Song[];
  generateImageObject?: JsonToGenerateImages;
  generateVideoObject?: JsonToGenerateVideo[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Changed json format for generating images, need to change on party-rank-video-generator

type Note = {
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
    notes: Note[] | null,
    average: number,
    cover: string
  }>
}

type JsonToGenerateVideo = {
  image_path: string;
  video_path: string;
  cut_time: number[];
}