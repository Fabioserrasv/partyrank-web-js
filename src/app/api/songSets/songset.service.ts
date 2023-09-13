import { prisma } from '../../lib/prisma';

export class SongSetService {
  constructor() { }

  private convertDbSetToModel(data: any){
    return {
      name: data.name
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
}