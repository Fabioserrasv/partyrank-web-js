import { NextResponse } from 'next/server';
import { prisma } from '../lib/prisma';
import { compareSync, hashSync } from "bcrypt-ts";
import { convertDbUserToModel } from '../app/api/user/user.repository';
export class UserService {
  constructor() { }

  async create(data: UserPostData): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: hashSync(data.password, 12),
          animeList: data.animeList,
          admin: false,
          createdAt: new Date()
        }
      })

      return convertDbUserToModel(newUser);
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

      return convertDbUserToModel(user);
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

      return users.map(convertDbUserToModel);
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

      return convertDbUserToModel(user)
    } catch (error) {
      throw error;
    }
  }

  async login(userLogin: UserLoginPost) {
    try {
      const user = await prisma.user.findMany({
        include:{
          scores: true
        },
        where: {
          username: userLogin.username,
          deletedAt: null
        }
      })

      if (user.length > 0) {
        if (compareSync(userLogin.password, user[0].password as string)) {
          return convertDbUserToModel(user[0])
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