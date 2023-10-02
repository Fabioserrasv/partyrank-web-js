import { answerUserToPartyRank, createSongSet, getAllSongSets, getSongSet, inviteUserToPartyRank, updateSongSet } from "@/actions/songset.actions";
import { getUserByUsername } from "@/actions/user.actions";

export async function handleCreateSongSetFormSubmit(data: SongSetPostData) {
  "use server"

  try {
    let newSongSet: false | SongSet = false
    if (data.id == 0) {
      newSongSet = await createSongSet({
        name: data.name,
      })
    } else {
      newSongSet = await updateSongSet(data, data.id!)
    }

    if (newSongSet) return newSongSet.id
    return false;
  } catch (error) {
    throw error
  }
}

export async function handleUpdateSongSet(set: SongSetPostData, id: number) {
  "use server"

  try {
    const newSet = await updateSongSet(set, id);

    return newSet;
  } catch (error) {
    throw error
  }
}

export async function handleGetSongSet(id: number, generateJson: boolean = false) {
  "use server"

  try {
    const set = await getSongSet(Number(id), generateJson);

    return set;
  } catch (error) {
    throw error
  }
}

export async function handleGetAllSongSets(name: string) {
  "use server"

  try {
    const sets = await getAllSongSets(name);

    return sets
  } catch (error) {
    throw error
  }
}

export async function handleInviteUser(songSetId: number, username: string) {
  "use server"

  try {
    const user = await getUserByUsername(username)
    
    return await inviteUserToPartyRank(songSetId, user.id)
  } catch (error) {
    throw error;
  }
}

export async function handleAnswerInvite(songSetId: number, userId: number, accept: boolean) {
  "use server"

  try {
    return await answerUserToPartyRank(songSetId, userId, accept)
    
  } catch (error) {
    throw error;
  }
}