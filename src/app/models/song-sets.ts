type SongSetPostData = {
  name: string;
}

type SongSet = {
  name: string;
  songs?: Song[]
  createdAt?: Date;
  updatedAt?: Date;
}