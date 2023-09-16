import { similarity } from "@/app/lib/similiarity";

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