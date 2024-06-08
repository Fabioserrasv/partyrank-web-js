import { convertDbImageAnimeToModel } from '@/repositories/imageanime.repository';
import { prisma } from '../lib/prisma';

export class ImagesAnimeService {
  constructor() { }

  async create(data: ImageAnimePost): Promise<ImageAnime> {
    try {

      const newImageAnime = await prisma.imagesAnime.create({
        data: {
          link: data.link,
          anilistLink: data.anilistLink ? data.anilistLink : null,
          animeName: data.animeName ? data.animeName : null,
          createdAt: new Date()
        }
      })

      return convertDbImageAnimeToModel(newImageAnime);
    } catch (error) {
      throw error;
    }
  }

  async update(data: ImageAnimePost, id: number): Promise<ImageAnime> {
    try {
      const imageAnime = await prisma.imagesAnime.update({
        where: {
          id: id
        },
        data: {
          link: data.link,
          anilistLink: data.anilistLink ? data.anilistLink : null,
          animeName: data.animeName ? data.animeName : null,
          updatedAt: new Date()
        }
      })

      return convertDbImageAnimeToModel(imageAnime);
    } catch (error) {
      throw error;
    }
  }

  async get(anilistLink?: string, animeName?: string): Promise<ImageAnime | null>{
    if (anilistLink == undefined && animeName == undefined) return null;
    try {
      const imageAnime = await prisma.imagesAnime.findMany({
        where: {
          OR: [
            {
              anilistLink: anilistLink
            },
            {
              animeName: animeName
            }
          ],
          deletedAt: null
        }
      })
      if (imageAnime.length == 0) return null;

      return convertDbImageAnimeToModel(imageAnime[0])
    } catch (error) {
      throw error;
    }
  }
  
  async delete(id: number) {
    try {
      await prisma.imagesAnime.update({
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