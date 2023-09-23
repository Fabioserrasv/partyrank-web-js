import { prisma } from '../lib/prisma';
import { SongSetService } from './songset.service';
import { convertDbSongToModel, convertType } from '../repositories/song.repository';

export class SongService {
  constructor() { }

  async create(data: SongPostData): Promise<Song> {
    try {

      const newSong = await prisma.song.create({
        data: {
          songSetId: data.songSetId,
          anime: data.anime,
          artist: data.artist,
          name: data.name,
          link: data.link,
          type: convertType(data.type),
          createdAt: new Date()
        }
      })

      return convertDbSongToModel(newSong);
    } catch (error) {

      throw error;
    }
  }

  async update(data: SongPostData, id: number): Promise<Song> {
    try {
      const set = await prisma.song.update({
        where: {
          id: id
        },
        data: {
          songSetId: data.songSetId,
          anime: data.anime,
          artist: data.artist,
          name: data.name,
          link: data.link,
          type: convertType(data.type),
          updatedAt: new Date()
        }
      })

      return convertDbSongToModel(set);
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Song[]> {
    try {
      const songs = await prisma.song.findMany({
        where: {
          deletedAt: null
        }
      });

      return songs.map(convertDbSongToModel);
    } catch (error) {
      throw error;
    }
  }

  async get(id: number): Promise<Song> {
    try {
      const set = await prisma.song.findUnique({
        where: {
          id: id,
          deletedAt: null
        }
      })

      return convertDbSongToModel(set)
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await prisma.song.update({
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