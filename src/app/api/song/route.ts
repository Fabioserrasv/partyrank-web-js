import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { createSong, getAllSongs } from '@/actions/song.actions';

export async function GET() {
  try {
    const songs = await getAllSongs();
  
    return NextResponse.json(songs)
  } catch (error) {
    return NextResponse.json({
      message: "Songs not found"
    })
  }
}

export async function POST(req: Request, res: Response) {
  const song: SongPostData = await req.json();

  try {
    const newSong = await createSong(song)

    return NextResponse.json({
      song: newSong
    }, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({
          message: "Duplicated"
        })
      }
    }
  }
}