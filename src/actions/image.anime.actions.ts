import { ImageAnimesRequest } from "@/app/api/ImagesAnime/request";
import { ImagesAnimeService } from "@/services/imageanime.service";

export async function createImagesAnime(imageAnime: ImageAnimePost) {
  const validateImagesAnime = new ImageAnimesRequest;
  const imageAnimeService = new ImagesAnimeService;

  // Validating the imageAnime (must improve, searching for libraries)
  if (!validateImagesAnime.rules(imageAnime)) {
    throw new Error("Invalid data")
  }

  return await imageAnimeService.create(imageAnime);
}

export async function getImagesAnime(animeName?: string, anilistLink?: string){
  if (anilistLink == undefined && animeName == undefined) return null;

  const imageAnimeService = new ImagesAnimeService;
  try {
    const imageAnime = await imageAnimeService.get(anilistLink, animeName)

    return imageAnime
  } catch (error) {
    throw error;
  }
}