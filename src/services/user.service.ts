import { NextResponse } from 'next/server';
import { prisma } from '../lib/prisma';
import { compareSync, hashSync } from "bcrypt-ts";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { convertDbUserToModel } from '@/repositories/user.repository';
import { Prisma } from '@prisma/client';

export class UserException extends Error {};

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
  
  async update(data: UserUpdateData, id: number): Promise<User> {
    try {
      const user = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          username: data.username,
          animeList: data.animeList,
          updatedAt: new Date()
        }
      })

      return convertDbUserToModel(user);
    } catch (e) {
      throw e
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
        include: {
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

  async getSessionUserAverage(): Promise<number> {
    try {
      const session = await getServerSession(options);
      if (!session?.user) return 0;

      const user = await prisma.user.findUnique({
        include: {
          scores: true
        },
        where: {
          id: session.user.id,
          deletedAt: null
        }
      })

      let average = 0

      if (user?.scores) {
        let sum = user.scores.map(score => score.value)
        average = (sum.reduce((a, b) => a + b, 0) / sum.length)
      }

      return average
    } catch (error) {
      throw error;
    }
  }
}