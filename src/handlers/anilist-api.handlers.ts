"use server"

import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";


export async function handleGetCoverImageFromAnilistUrl(link: string) {
  const anilistGraphQlUrl = 'https://graphql.anilist.co';

  const query = `
  query ($id: Int) {
    Media (id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
      }
    }
  }
  `;

  const idUrl = extractAnimeId(link);

  if (idUrl === null) return '';

  const queryVariables: any = {
    id: idUrl,
  }

  try {
    let coverImageUrl: string = '';

    await axios.post(anilistGraphQlUrl, {
      query: query,
      variables: queryVariables
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then((res) => {
        const response: MediaResponse = res.data;
        const data: Media = response.data.Media
        coverImageUrl = data.coverImage.extraLarge ? data.coverImage.extraLarge : (data.coverImage.large ? data.coverImage.large : '')
      })
      .catch(function (error) {
        throw error
      })

    return coverImageUrl
  } catch (error) {
    throw error
  }

  function extractAnimeId(url: string): number | null {
    // Define a expressão regular para capturar o ID
    const regex = /https:\/\/anilist\.co\/anime\/(\d+)\//;

    if (url == '' || url == null) return null;

    // Executa a expressão regular na URL fornecida
    const match = url.match(regex);

    // Verifica se houve correspondência e retorna o ID como número
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }

    // Retorna null se não houver correspondência
    return null;
  }
}