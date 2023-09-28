import { getService } from "@/repositories/songfinder.repository";

export async function searchSongFinder(query: string = '', songSetId: number = 0, serviceName: string = '') {
  try {
    if (serviceName == '') throw new Error("Service not found")

    const service = getService(serviceName)
    
    if (!service) throw new Error("Service not found")
  
    if (query != '') {
      const songs = await service.search(query);
      return songs
    }
    
    if (songSetId != 0) {
      const songs = await service.searchBySongSetId(Number(songSetId));
      return songs
    }

  } catch (error) {
    throw error;
  }
}
