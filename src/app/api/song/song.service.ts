import { prisma } from '../../lib/prisma';
import { SongSetService } from '../song-sets/songset.service';

enum SongType{
  OPENING = "OPENING",
  ENDING = "ENDING",
  INSERT_SONG = "INSERT_SONG"
}

export class SongService {
  constructor() { }

  private convertDbSongToModel(data: any) {
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

  private convertType(type: string): SongType {
    return type as SongType
  }

  async create(data: SongPostData): Promise<Song> {
    try {

      const newSong = await prisma.song.create({
        data: {
          songSetId: data.songSetId,
          anime: data.anime,
          artist: data.artist,
          name: data.name,
          link: data.link,
          type: this.convertType(data.type),
          createdAt: new Date()
        }
      })

      return this.convertDbSongToModel(newSong);
    } catch (error) {

      throw error;
    }
  }

  async update(data: SongPostData, id: number): Promise<SongSet> {
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
          type: this.convertType(data.type),
          updatedAt: new Date()
        }
      })

      return this.convertDbSongToModel(set);
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

      return songs.map(this.convertDbSongToModel);
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

      return this.convertDbSongToModel(set)
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