'use server'
import { createMultipleSongs, createSong, deleteSong, updateSong } from "@/actions/song.actions";
import { AddSongFormSchema } from "@/app/songsets/create/[id]/clientPage";

export async function handleAddSongFormSubmit(data: AddSongFormSchema, songSetId: number) {
  try {
    let newSong: false | Song = false
    const song = {
      anime: data.anime,
      artist: data.artist,
      link: data.link,
      name: data.name,
      imageUrl: data.imageUrl,
      type: data.type,
      pickedBy: data.pickedBy,
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

export async function handleAddMultipleSongsFormSubmit(data: AddSongFormSchema[], songSetId: number) {
  try {
    const newSongs = await createMultipleSongs(data.map(d => ({
      anime: d.anime,
      artist: d.artist,
      link: d.link,
      name: d.name,
      imageUrl: d.imageUrl,
      type: d.type,
      songSetId: songSetId,
      pickedById: d.pickedById ? Number(d.pickedById) : undefined
    })));
    
    return newSongs;
  } catch (error) {
    throw error;
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