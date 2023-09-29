import { getService } from "@/repositories/songfinder.repository";

export async function searchSongFinder(data: SongFinderAction) {
  try {
    if (data.serviceName == '') throw new Error("Service not found")

    const service = getService(data.serviceName)

    if (!service) throw new Error("Service not found")

    if (data.query != '') {
      const songs = await service.search(data.query, data.songName, data.artistName);
      return songs
    }

    if (data.songSetId != 0) {
      const songs = await service.searchBySongSetId(Number(data.songSetId));
      return songs
    }

    return []
  } catch (error) {
    throw error;
  }
}
