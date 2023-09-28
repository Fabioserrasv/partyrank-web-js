import { searchSongFinder } from "@/actions/songfinder.actions";

export async function handleSongFinderFormSubmit(data: SongFinderAction) {
  "use server";

  try {
    const songs = await searchSongFinder(data);

    return songs
  } catch (error) {
    throw error
  }
}