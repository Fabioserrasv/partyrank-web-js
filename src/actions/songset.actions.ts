import { options } from "@/app/api/auth/[...nextauth]/options";
import { SongSetRequest } from "@/app/api/song-sets/requests";
import { filterOnlyUserOn } from "@/repositories/songset.repository";
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

export async function getAllSongSets(name: string, loggedUserId: number) {
  const setService = new SongSetService;
  try {
    const sets = await setService.getAll(name, loggedUserId);

    return sets
  } catch (error) {
    throw error
  }
}

export async function getAllSongSetsHomePage(name: string, loggedUserId: number) {
  const setService = new SongSetService;
  try {
    const sets = await setService.getAllPublic(name, loggedUserId);

    return sets
  } catch (error) {
    throw error
  }
}

export async function getAllMySongSetsPage(name: string, loggedUserId: number) {
  const setService = new SongSetService;
  try {
    const sets = await setService.getAll(name, loggedUserId);

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

export async function inviteUserToPartyRank(songSetId: number, userId: number) {
  try {
    const setService = new SongSetService;
    const response = await setService.inviteUser(songSetId, userId);

    return response
  } catch (error) {
    throw error;
  }
}

export async function answerUserToPartyRank(songSetId: number, userId: number, accept: boolean) {
  try {
    const setService = new SongSetService;
    const response = await setService.answerInvite(songSetId, userId, accept);

    return response
  } catch (error) {
    throw error;
  }
}

export async function joinPublicPartyRank(songSetId: number, userId: number) {
  try {
    const setService = new SongSetService;
    const response = await setService.answerInvite(songSetId, userId, true);

    return response
  } catch (error) {
    throw error;
  }
}

export async function leaveSongSet(songSetId: number, userId: number){
  try {
    const setService = new SongSetService;

    return await setService.leaveSongSet(songSetId, userId); 
  } catch (error) {
    throw error;
  }
}