'use server'
import { createSong, deleteSong, updateSong } from "@/actions/song.actions";
import { AddSongFormSchema } from "@/app/songsets/create/[id]/clientPage";

export async function handleAddSongFormSubmit(data: AddSongFormSchema, songSetId: number) {
  try {
    let newSong: false | Song = false
    const song = {
      anime: data.anime,
      artist: data.artist,
      link: data.link,
      name: data.name,
      type: data.type,
      songSetId: songSetId
    };

    if (data.id == 0) {
      newSong = await createSong(song)
    } else {
      newSong = await updateSong(song, data.id)
    }

    if (newSong) return newSong.id
    return false;
  } catch (error) {
    throw error
  }
}

export async function handleDeleteSong(id: number) {
  try {
    await deleteSong(id);
    return true;
  } catch (error) {
    throw error;
  }
}