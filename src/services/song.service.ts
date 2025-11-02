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

  async createMultiple(data: SongPostData[]): Promise<Song[]> {
    try {
      const newSongs = await prisma.song.createMany({
        data: data.map(d => ({
          songSetId: d.songSetId,
          anime: d.anime,
          artist: d.artist,
          name: d.name,
          link: d.link,
          type: convertType(d.type),
          createdAt: new Date()
        }))
      })

      const songs = await prisma.song.findMany({
        distinct: [
          'anime',
          'artist',
          'name',
          'link',
          'type'
        ],
        where: {
          songSetId: data[0].songSetId,
          anime: {in: data.map(d => d.anime)},
          artist: {in: data.map(d => d.artist)},
          name: {in: data.map(d => d.name)},
          link: {in: data.map(d => d.link)},
          type: {in: data.map(d => convertType(d.type))}
        },
        orderBy: {
          id: 'desc'
        }
      });

      return songs.map(convertDbSongToModel);

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