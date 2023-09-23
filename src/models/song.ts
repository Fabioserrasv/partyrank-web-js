type SongType =
  | 'OPENING'
  | 'ENDING'
  | 'INSERT_SONG';

type UserLoginPost = {
  username: string,
  password: string
}

type SongPostData = {
  songSetId: number;
  anime: string;
  artist: string;
  name: string;
  link: string;
  type: string;
}

type Song = {
  id: number;
  songSet: SongSet;
  anime: string;
  artist: string;
  name: string;
  link: string;
  type: SongType;
  scores: Score[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
