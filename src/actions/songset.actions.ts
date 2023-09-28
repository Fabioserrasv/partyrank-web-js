import { SongSetRequest } from "@/app/api/song-sets/requests";
import { SongSetService } from "@/services/songset.service";

export async function createSongSet(set: SongSetPostData) {
  const validateSongSet = new SongSetRequest;
  const setService = new SongSetService;

  if (!validateSongSet.rules(set)) {
    throw new Error("Invalid data")
  }

  try {
    const newSet = await setService.create(set);

    return newSet
  } catch (error) {
    throw error
  }
}

export async function updateSongSet(set: SongSetPostData, id: number) {
  const validateSongSet = new SongSetRequest;
  const setService = new SongSetService;

  if (!validateSongSet.rules(set)) {
    throw new Error("Invalid data")
  }

  try {
    const newSet = await setService.update(set, id);

    return newSet
  } catch (error) {
    throw error
  }
}

export async function getSongSet(id: number, generateJson: boolean = false) {
  const setService = new SongSetService;

  try {
    const set = await setService.get(Number(id), generateJson);

    return set;
  } catch (error) {
    throw error
  }
}

export async function getAllSongSets(name: string) {
  const setService = new SongSetService;
  try {
    const sets = await setService.getAll(name);

    return sets
  } catch (error) {
    throw error
  }
}

export async function deleteSongSet(id: number) {
  try {
    const setService = new SongSetService;
    await setService.delete(id);
    return true;
  } catch (error) {
    throw error
  }
}