type UserPostData = {
  username: string;
  password: string;
  animeList: string;
}

type User = {
  id:number;
  username: string;
  password?: string;
  animeList: string;
  admin: boolean;
  scores?: Score[];
}