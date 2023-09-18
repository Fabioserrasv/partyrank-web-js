import { similarity } from "@/app/api/lib/similiarity";
import { AnimeThemesService } from "./services/AnimeThemes.service";

function checkTypeEqual(a: string, b: string) {
  if (a === "OPENING" && b === "OP") return true;
  if (a === "ENDING" && b === "ED") return true;
  return false;
}

export function getMostPossibleSong(songWebs: SongWeb[], songDb: Song) {
  let result: SongWeb | null = null
  songWebs.forEach((songW) => {
    if (result != null) return; 
    let animeNamePercentage = similarity(songW.anime, songDb.anime)
    if (animeNamePercentage > 0.30) {
      if (checkTypeEqual(songDb.type, songW.type)) {
        let titlePercentage = similarity(songDb.name, songW.title)
        if (titlePercentage > 0.40) {
          result = songW
        }
      }
    }
  })
  return result;
}

export function generateSongFinderFolder() : string {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  let x = dd + '' + mm + '' + yyyy;

  return String(Math.floor(Math.random() * 900) + 'song_finder_' + x)
}

export function getService(name: string) {
  let service: SongFinderContract | null

  switch (name) {
    case "animethemes":
      service = new AnimeThemesService(generateSongFinderFolder());
      break;
    default:
      service = null;
      break;
  }

  return service;
}