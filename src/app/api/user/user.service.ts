import { prisma } from '../../lib/prisma';

export class UserService {
  constructor() { }

  private convertDbUserToModel(dbUser: any): User {
    return {
      id: dbUser.id,
      username: dbUser.username,
      animeList: dbUser.animeList,
      admin: dbUser.admin
    }
  }

  async create(data: UserPostData): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: data.password,
          animeList: data.animeList,
          admin: false
        }
      })

      return this.convertDbUserToModel(newUser);
    } catch (error) {

      throw error;
    }
  }

  async update(data: UserPostData, id: number): Promise<User>{
    try {
      const user = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          username: data.username,
          password: data.password,
          animeList: data.animeList,
          updatedAt: new Date()
        }
      })

      return this.convertDbUserToModel(user);
    } catch (error) {

      throw error;  
    }
  }

  async removeUser(userId: number) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany({});

      return users.map(this.convertDbUserToModel);
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id
        }
      })

      return this.convertDbUserToModel(user)
    } catch (error) {
      throw error;
    }
  }
}