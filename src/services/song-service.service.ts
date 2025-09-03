import { prisma } from "@/lib/prisma";
import { convertDbServiceToModel } from "@/repositories/song-service.repository";

export class SongServiceService {
  constructor() { }

  async getAll(): Promise<SongService[]> {
    const services = await prisma.songService.findMany({
      where: {
        deletedAt: null,
        active: true
      }
    });

    return services.map(convertDbServiceToModel);
  }
}