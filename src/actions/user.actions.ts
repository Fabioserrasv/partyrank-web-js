import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserRequest } from "@/app/api/user/request";
import { PROFILE_PICTURE_PERMITED_EXTENSIONS } from "@/repositories/user.repository";
import { UserService } from "@/services/user.service";
import { writeFile } from 'fs/promises'
import { getServerSession } from "next-auth";

export async function createUser(user: UserPostData) {
  try {
    const validateUser = new UserRequest;
    const userService = new UserService;
    // Validating the user (must improve, searching for libraries)
    if (!validateUser.rules(user)) {
      throw new Error("Invalid data")
    }
  
    const newUser = await userService.create(user);
    return newUser
  } catch (error) {
    throw error
  }
}

export async function getUser(id: number) {
  const userService = new UserService;

  try {
    const user = await userService.getUser(id);
    return user
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  const userService = new UserService;

  try {
    const users = await userService.getAllUsers();
    return users
  } catch (error) {
    throw error;
  }
}

export async function updateUserInfo(data: UserUpdateData, id: number) {
  const userService = new UserService;
  const validateUser = new UserRequest;

  // Validating the user (must improve, searching for libraries)
  if (!validateUser.rulesUpdate(data)) {
    throw new Error("Invalid data")
  }

  try {
    const newUser = await userService.update({
      username: data.username,
      animeList: data.animeList
    }, id)

    return newUser;
  } catch (error) {
    throw error
  }
}

export async function updateUserPassword({ oldPass, newPass }: ChangePasswordType, id: number) {
  const userService = new UserService;

  try {
    const response = await userService.updatePassword({
      oldPass,
      newPass
    }, id)

    return response;
  } catch (error) {
    throw error
  }
}

export async function updateUserPicture(file: File){
  try {
    const session = await getServerSession(options);
    const userService = new UserService;
    
    if (!file) {
      throw new Error("File not Found")
    }
    
    const extension = String(file.name.split('.').pop())
    
    if (!PROFILE_PICTURE_PERMITED_EXTENSIONS.includes(extension)) {
      throw new Error("File extension not supported.")
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileName = session?.user.username + '.' + extension;
    const path = `/public/user_images/${fileName}`
    const pathDb = `/user_images/${fileName}`
    await writeFile('.' + path, buffer)
    
    userService.updateProfilePicture(pathDb, session?.user.id as number)
  
    return true
  } catch (error) {
    throw error
  }
}

export async function deleteUser(id: number) {
  try {
    const userService = new UserService;
    await userService.removeUser(id);
    return true;
  } catch (error) {
    throw error
  }
}
