import { prisma } from '../lib/prisma';
import { convertDbScoreToModel } from '../app/api/score/score.repository';

export class ScoreService {
  constructor() { }

  private async checkIfScoreExists(songId: number, userId: number) : Promise<boolean>{
    const score = await prisma.score.findMany({
      where: {
        songId: songId,
        userId: userId,
        deletedAt: null
      }
    });
    
    if (score.length > 0) return true;

    return false;
  }

  async create(data: ScorePost): Promise<Score> {
    try {
      if (await this.checkIfScoreExists(data.songId, data.userId)){
        const score = await this.getScoreBySongAndUser(data.songId, data.userId);
        return await this.update(data, score.id);
      }

      const newScore = await prisma.score.create({
        data: {
          songId: data.songId,
          userId: data.userId, // LOGGED USER
          value: data.value,
          videoTimeStamp: data.videoTimeStamp,
          valid: 1,
          createdAt: new Date()
        }
      })

      return convertDbScoreToModel(newScore);
    } catch (error) {
      throw error;
    }
  }

  async update(data: ScorePost, id: number): Promise<Score> {
    try {
      const set = await prisma.score.update({
        where: {
          id: id
        },
        data: {
          songId: data.songId,
          userId: data.userId, // LOGGED USER
          value: data.value,
          videoTimeStamp: data.videoTimeStamp,
          valid: 1,
          updatedAt: new Date()
        }
      })

      return convertDbScoreToModel(set);
    } catch (error) {
      throw error;
    }
  }

  async getScoreBySongAndUser(songId: number, userId: number) : Promise<Score> {
    try {
      const songs = await prisma.score.findMany({
        where: {
          songId: songId,
          userId: userId,
          deletedAt: null
        }
      });

      return songs.map(convertDbScoreToModel)[0];
    } catch (error) {
      throw error;
    }
  }

  async getAllScoreFromSong(songId: number){
    try {
      const songs = await prisma.score.findMany({
        where: {
          deletedAt: null,
          songId: songId
        }
      });

      return songs.map(convertDbScoreToModel);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await prisma.score.update({
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