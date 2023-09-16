import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { compareSync, hashSync } from "bcrypt-ts";
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
      console.log(hashSync(data.password, 12))
      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: hashSync(data.password, 12),
          animeList: data.animeList,
          admin: false,
          createdAt: new Date()
        }
      })

      return this.convertDbUserToModel(newUser);
    } catch (error) {
      throw error;
    }
  }

  async updateProfilePicture(imageUrl: string, userId: number) {
    try {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          imageUrl: imageUrl,
          updatedAt: new Date()
        }
      })

      return NextResponse.json({})
    } catch (error) {
      return NextResponse.json({
        "message": "Error updating profile picture"
      }, { status: 400 })
    }
  }

  async update(data: UserPostData, id: number): Promise<User> {
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
      const users = await prisma.user.findMany({
        where: {
          deletedAt: null
        }
      });

      return users.map(this.convertDbUserToModel);
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
          deletedAt: null
        }
      })

      return this.convertDbUserToModel(user)
    } catch (error) {
      throw error;
    }
  }

  async login(userLogin: UserLoginPost) {
    try {
      const user = await prisma.user.findMany({
        where: {
          username: userLogin.username,
          deletedAt: null
        }
      })

      if (user.length > 0) {
        if (compareSync(userLogin.password, user[0].password as string)) {
          return this.convertDbUserToModel(user[0])
        } else {
          return null
        }
      }

      return null
    } catch (error) {
      throw error;
    }
  }
}