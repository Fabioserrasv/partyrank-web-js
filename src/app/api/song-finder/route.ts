import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server"; import { AnimeThemesService } from './services/AnimeThemes.service';
import { generateSongFinderFolder, getService } from './songfinder.repository';

export async function GET(req: Request, res: Response) {
  try {
    const query = (new URL(req.url)).searchParams.get('q');
    const songSetId = (new URL(req.url)).searchParams.get('id');
    const serviceName = (new URL(req.url)).searchParams.get('service');

    if (!serviceName) return NextResponse.json({ "message": "Service not found" }, { status: 400 })
    const service = getService(serviceName)
    if (!service) return NextResponse.json({ "message": "Service not found" }, { status: 400 }) 

    if (query) {
      const songs = await service.search(query);
      return NextResponse.json(songs)
    }

    if (songSetId) {
      const songs = await service.searchBySongSetId(Number(songSetId));
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