import { NextResponse } from "next/server";
import { createSongSet, getAllSongSets } from '@/actions/songset.actions';

export async function GET() {
  try {
    //fix later
    const services: SongService[] = []

    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({
      message: "Services Not Found"
    })
  }
}
