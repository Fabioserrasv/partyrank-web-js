type UserPostData = {
  username: string;
  password: string;
  animeList: string;
  email: string;
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
  average?: number;
  admin?: boolean;
  imageUrl?: string;
  isPlaceholder?: boolean;
  invites?: UserOn[];
  scores?: Score[];
  createdAt?: Date;
  updatedAt?: Date;
}

type FiltersQueryUser = BaseFilters & {
  username?: string;
}

type ResultUsers = {
  users: User[];
  count: number;
}