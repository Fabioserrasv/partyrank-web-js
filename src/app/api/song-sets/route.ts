import { NextResponse } from "next/server";
import { createSongSet, getAllSongSets } from '@/actions/songset.actions';

export async function GET() {
  try {
    //fix later
    const sets = await getAllSongSets("", 0);

    return NextResponse.json(sets)
  } catch (error) {
    return NextResponse.json({
      message: "Song Sets Not Found"
    })
  }
}

export async function POST(req: Request, res: Response) {
  const set: SongSetPostData = await req.json();

  try {
    const newSet = await createSongSet(set);

    return NextResponse.json(newSet)
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" })
  }
}