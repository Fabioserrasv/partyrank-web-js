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
  meanScore?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

type FiltersQuerySong = BaseFilters & {
  name?: string;
  anime?: string;
  artist?: string;
  type?: SongType;
  songSetId?: number;
}

type ResultSongs = {
  songs: Song[];
  count: number;
}
