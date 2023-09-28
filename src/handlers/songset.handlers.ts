import { createSongSet, getAllSongSets, getSongSet, updateSongSet } from "@/actions/songset.actions";

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
