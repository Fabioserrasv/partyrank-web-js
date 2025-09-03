import { SongServiceService } from "@/services/song-service.service";

export async function getAllServices() {
  const songService = new SongServiceService;
  try {
    const services = await songService.getAll();

    return services
  } catch (error) {
    throw error
  }
}