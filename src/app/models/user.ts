type UserPostData = {
  username: string;
  password: string;
  animeList: string;
} 

type UserProfilePicturePost = {
  image: File;
}

type User = {
  id:number;
  username: string;
  password?: string;
  animeList: string;
  admin: boolean;
  imageUrl?: string;
  scores?: Score[];
  createdAt?: Date;
  updatedAt?: Date;
}