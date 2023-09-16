import { prisma } from '../../lib/prisma';

export class SongSetService {
  constructor() { }

  private convertDbSongToModel(data: any) : Song{
    return {
      id: data.id,
      songSet: data.songSet,
      anime: data.anime,
      artist: data.artist,
      name: data.name,
      link: data.link,
      type: data.type,
      scores: data.scores,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  }

  private convertDbSetToModel(data: any) : SongSet{
    
    return {
      name: data.name,
      songs: data.songs !== undefined && data.songs.length > 0 ? data.songs.map(this.convertDbSongToModel) : [],
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  }

  async create(data: SongSetPostData): Promise<SongSet> {
    try {
      const newSet = await prisma.songSet.create({
        data: {
          name: data.name,
          createdAt: new Date()
        }
      })

      return this.convertDbSetToModel(newSet);
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<SongSet[]> {
    try {
      const sets = await prisma.songSet.findMany({
        where: {
          deletedAt: null
        }
      });

      return sets.map(this.convertDbSetToModel);
    } catch (error) {
      throw error;
    }
  }

  async get(id: number): Promise<SongSet> {
    try {
      const set = await prisma.songSet.findUnique({
        include: {
          songs: true
        },
        where: {
          id: id,
          deletedAt: null
        }
      })
      if (set !== null) {
        return this.convertDbSetToModel(set)
      }else{
        throw new Error('Could not find Song Set')
      }
    } catch (error) {
      throw error;
    }
  }

  async update(data: SongSetPostData, id: number): Promise<SongSet> {
    try {
      const set = await prisma.songSet.update({
        where: {
          id: id
        },
        data: {
          name: data.name,
          updatedAt: new Date()
        }
      })

      return this.convertDbSetToModel(set);
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
}