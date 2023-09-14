import { prisma } from '../../lib/prisma';

export class SongSetService {
  constructor() { }

  private convertDbSetToModel(data: any) : SongSet{
    return {
      name: data.name,
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
        where: {
          id: id,
          deletedAt: null
        }
      })

      return this.convertDbSetToModel(set)
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