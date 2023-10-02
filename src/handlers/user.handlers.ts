import { createUser, getUser, updateUserInfo, updateUserPassword } from "@/actions/user.actions"
import { ChangeUserInfoFormSchema } from "@/app/profile/forms/changeUserInfoForm"

export async function handleCreateUserForm(data: UserPostData): Promise<User> {
  "use server"

  try {
    data.animeList = ''
    return await createUser(data);
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

export async function handleGetUser(id: number) {
  "use server"

  try {
    return await getUser(id);
  } catch (error) {
    throw error
  }
}


export async function handleUpdatePasswordForm({ oldPass, newPass }: ChangePasswordType, id: number) {
  "use server"

  try {
    const response = await updateUserPassword({
      oldPass,
      newPass
    }, id)

    return response
  } catch (error) {
    throw error
  }
}
