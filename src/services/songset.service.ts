import { getServerSession } from 'next-auth';
import { prisma } from '../lib/prisma';
import { convertDbSetToModel } from '../repositories/songset.repository';
import { options } from '../app/api/auth/[...nextauth]/options';
import { UserService } from './user.service';

export class SongSetService {
  constructor() { }

  async create(data: SongSetPostData): Promise<SongSet> {
    const session = await getServerSession(options);

    if (!session) throw new Error("No session");

    try {
      const newSet = await prisma.songSet.create({
        data: {
          name: data.name,
          anilistLink: data.anilistLink,
          userId: session?.user.id,
          createdAt: new Date()
        }
      })

      return await convertDbSetToModel(newSet);
    } catch (error) {
      throw error;
    }
  }

  async getAll(name: string, loggedUserId?: number): Promise<SongSet[]> {
    try {
      const sets = await prisma.songSet.findMany({
        include: {
          songs: {
            where: {
              deletedAt: null
            }
          },
          user: {
            select: {
              username: true,
              id: true,
              imageUrl: true
            }
          },
          users: {
            select: {
              accepted: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  animeList: true,
                  imageUrl: true
                }
              }
            }
          }
        },
        where: {
          name: {
            contains: name
          },
          OR: [
            {
              users: {
                some: {
                  user: {
                    id: loggedUserId
                  }
                }
              }
            },
            {
              user: {
                id: loggedUserId
              }
            }
          ],
          deletedAt: null
        }
      });


      const result = await Promise.all(sets.map(async (s) => await convertDbSetToModel(s)));

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllPublic(name: string, loggedUserId: number): Promise<SongSet[]> {
    try {
      const sets = await prisma.songSet.findMany({
        include: {
          songs: {
            where: {
              deletedAt: null
            }
          },
          user: {
            select: {
              username: true,
              id: true
            }
          },
          users: {
            select: {
              accepted: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  animeList: true
                }
              }
            }
          }
        },
        where: {
          name: {
            contains: name
          },
          type: 'PUBLIC',
          NOT: [
            {
              user: {
                id: loggedUserId
              }
            },
            {
              users: {
                some: {
                  user: {
                    id: loggedUserId
                  }
                }
              }
            }
          ],
          deletedAt: null
        }
      });

      const result = await Promise.all(sets.map(async (s) => await convertDbSetToModel(s)));

      return result;
    } catch (error) {
      throw error;
    }
  }

  async get(id: number, generateJson: boolean): Promise<SongSet | null> {
    try {
      const set = await prisma.songSet.findUnique({
        include: {
          songs: {
            where: {
              deletedAt: null
            },
            orderBy: {
              createdAt: 'asc',
            },
            include: {
              scores: {
                orderBy: {
                  userId: 'asc'
                },
                select: {
                  user: {
                    select: {
                      id: true,
                      username: true,
                      animeList: true
                    },
                  },
                  value: true,
                  videoTimeStamp: true
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              username: true,
              animeList: true
            }
          },
          users: {
            select: {
              accepted: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  animeList: true
                }
              }
            }
          }
        },
        where: {
          id: id,
          deletedAt: null
        }
      })
      if (set !== null) {
        return await convertDbSetToModel(set, generateJson)
      }
      return null
    } catch (error) {
      throw error;
    }
  }

  async update(data: SongSetPostData, id: number): Promise<SongSet> {
    try {
      const set = await prisma.songSet.update({
        include: {
          user: {
            select: {
              id: true,
              username: true,
              animeList: true
            }
          },
          users: {
            select: {
              accepted: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  animeList: true
                }
              }
            }
          },
          songs: {
            where: {
              deletedAt: null
            }
          }
        },
        where: {
          id: id
        },
        data: {
          name: data.name,
          anilistLink: data.anilistLink,
          status: data.status,
          type: data.type,
          scoreSystem: data.scoreSystem,
          updatedAt: new Date()
        }
      })

      return await convertDbSetToModel(set);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await prisma.songSet.update({
        where: {
          id: id
        },
        data: {
          deletedAt: new Date()
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async inviteUser(songSetId: number, userId: number): Promise<Boolean> {
    try {
      const userService = new UserService;
      const isAccepting = await userService.checkAcceptingInvite(userId);

      if (isAccepting) {
        await prisma.usersOnSongSet.create({
          data: {
            userId: userId,
            songSetId: songSetId
          }
        })
        return true
      }
      return false
    } catch (error) {
      throw error;
    }
  }

  async answerInvite(songSetId: number, userId: number, accept: boolean): Promise<Boolean> {
    try {
      if (accept) {
        await prisma.usersOnSongSet.update({
          where: {
            songSetId_userId: {
              songSetId: songSetId,
              userId: userId
            }
          },
          data: {
            accepted: true
          }
        })
      } else {
        await prisma.usersOnSongSet.delete({
          where: {
            songSetId_userId: {
              songSetId: songSetId,
              userId: userId
            }
          }
        })
      }
      return true
    } catch (error) {
      throw error;
    }
  }

  async leaveSongSet(songSetId: number, userId: number): Promise<Boolean> {
    try {
      await prisma.usersOnSongSet.delete({
        where: {
          songSetId_userId: {
            songSetId: songSetId,
            userId: userId
          }
        }
      })
      return true
    } catch (error) {
      throw error;
    }
  }
}