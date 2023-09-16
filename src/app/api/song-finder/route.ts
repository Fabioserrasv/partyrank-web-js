import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server"; import { AnimeThemesService } from './services/AnimeThemesService';
;

export const animeThemesService = new AnimeThemesService;

export async function GET(req: Request, res: Response) {
  try {
    const query = (new URL(req.url)).searchParams.get('q');
    const songSetId = (new URL(req.url)).searchParams.get('id');

    if (query) {
      const songs = await animeThemesService.search(query);
      return NextResponse.json(songs)
    }

    if (songSetId){
      const songs = await animeThemesService.searchBySongSetId(Number(songSetId));
      return NextResponse.json(songs)
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong"
    })
  }
}