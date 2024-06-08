"use server"

import { createImagesAnime, getImagesAnime } from "@/actions/image.anime.actions"

export async function handleAddImageAnimeFormSubmit(data: ImageAnimePost) {
  try {
    const imageAnime = await createImagesAnime({
      link: data.link,
      anilistLink: data.anilistLink,
      animeName: data.animeName
    })
    return imageAnime.id
  } catch (error) {
    throw error
  }
}

export async function handleGetImageAnime(anilistLink?: string, animeName?: string) {
  try {
    const imageAnime = await getImagesAnime(animeName, anilistLink);

    return imageAnime;
  } catch (error) {
    throw error
  }
}