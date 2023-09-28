import { UserRequest } from "@/app/api/user/request";
import { ChangeUserInfoFormSchema } from "@/app/profile/forms/changeUserInfoForm"
import { UserService } from "@/services/user.service"

export async function updateUserInfo(data: UserUpdateData, id: number) {
  const userService = new UserService;
  const validateUser = new UserRequest;

  // Validating the user (must improve, searching for libraries)
  if (!validateUser.rulesUpdate(data)) {
    throw new Error("Invalid data")
  }

  try {
    const newUser = userService.update({
      username: data.username,
      animeList: data.animeList
    }, id)

    return newUser;
  } catch (error) {
    throw error
  }
}

export async function handleUpdateUserInfoForm(data: ChangeUserInfoFormSchema, id: number) {
  "use server"

  try {
    await updateUserInfo({
      animeList: data.animelist,
      username: data.username
    }, id)

    return true
  } catch (error) {
    throw error
  }
}

export function convertDbUserToModel(dbUser: any): User {
  return {
    id: dbUser.id,
    username: dbUser.username,
    animeList: dbUser.animeList,
    admin: dbUser.admin,
    scores: dbUser.scores,
    imageUrl: dbUser.imageUrl
  }
}