import { NextResponse } from "next/server";
import { searchSongFinder } from '@/actions/songfinder.actions';

export async function GET(req: Request, res: Response) {
  try {
    const query = (new URL(req.url)).searchParams.get('q') || '';
    const songSetId = Number((new URL(req.url)).searchParams.get('id')) || 0;
    const serviceName = (new URL(req.url)).searchParams.get('service')  || '';

    const songs = await searchSongFinder({query, songSetId, serviceName});

    return NextResponse.json(songs);
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    })
  }
}