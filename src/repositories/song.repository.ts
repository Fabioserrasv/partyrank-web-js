import { SongService } from "@/services/song.service";
import { SongRequest } from "../app/api/song/request";
import { AddSongFormSchema } from "@/app/songsets/create/[id]/clientPage";

export function convertDbSongToModel(data: any) {
  return {
    id: data.id,
    songSet: data.songSet,
    anime: data.anime,
    artist: data.artist,
    name: data.name,
    link: data.link,
    type: data.type,
    scores: data.scores,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function convertType(type: string): SongType {
  enum SongType {
    OPENING = "OPENING",
    ENDING = "ENDING",
    INSERT_SONG = "INSERT_SONG"
  }

  return type as SongType
}

export async function createSong(song: SongPostData) {
  const validateSong = new SongRequest;
  const songService = new SongService;
  // Validating the song (must improve, searching for libraries)
  if (!validateSong.rules(song)) {
    throw new Error("Invalid data")
  }

  return await songService.create(song);
}

export async function handleAddSongFormSubmit(data: AddSongFormSchema, songSetId: number) {
  "use server"

  try {
    const newScore = await createSong({
      anime: data.anime,
      artist: data.artist,
      link: data.link,
      name: data.name,
      type: data.type,
      songSetId: songSetId
    })

    return newScore.id
  } catch (error) {
    return false
  }
}

export async function handleDeleteSong(id: number) {
  "use server"
  
  const songService = new SongService;
  try {
    await songService.delete(id);
    return true;
  } catch (error) {
    return false;
  }
}