import { SongRequest } from "@/app/api/song/request";
import { SongService } from "@/services/song.service";

export async function createSong(song: SongPostData) {
  try {
    const validateSong = new SongRequest;
    const songService = new SongService;
    // Validating the song (must improve, searching for libraries)
    if (!validateSong.rules(song)) {
      throw new Error("Invalid data")
    }

    return await songService.create(song);
  } catch (error) {
    throw error
  }
}

export async function getSong(id: number) {
  const songService = new SongService;
  try {
    const song = await songService.get(id);

    return song
  } catch (error) {
    throw error
  }
}

export async function getAllSongs() {
  const songService = new SongService;
  try {
    const songs = await songService.getAll();

    return songs
  } catch (error) {
    throw error
  }
}

export async function updateSong(song: SongPostData, id: number) {
  try {
    const validateSong = new SongRequest;
    const songService = new SongService;
    // Validating the song (must improve, searching for libraries)
    if (!validateSong.rules(song)) {
      throw new Error("Invalid data")
    }

    return await songService.update(song, id);
  } catch (error) {
    throw error
  }
}

export async function deleteSong(id: number) {
  try {
    const songService = new SongService;
    await songService.delete(id);
    return true;
  } catch (error) {
    throw error
  }
}