type UserPostData = {
  username: string;
  password: string;
  animeList: string;
}

type UserUpdateData = {
  username: string;
  animeList: string;
}

type ChangeProfilePictureSchema = {
  profileImage: FileList
}

type ChangePasswordType = { oldPass: string, newPass: string }

type UserProfilePicturePost = {
  image: File;
}

type User = {
  id: number;
  username: string;
  password?: string;
  animeList: string;
  admin?: boolean;
  imageUrl?: string;
  invites?: UserOn[];
  scores?: Score[];
  createdAt?: Date;
  updatedAt?: Date;
}