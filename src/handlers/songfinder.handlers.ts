"use server"
import { searchSongFinder } from "@/actions/songfinder.actions";

export async function handleSongFinderFormSubmit(data: SongFinderAction) {
  try {
    const songs = await searchSongFinder(data);

    return songs
  } catch (error) {
    throw error
  }
}