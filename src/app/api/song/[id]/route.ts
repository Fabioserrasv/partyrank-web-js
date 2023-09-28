import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { deleteSong, getSong, updateSong } from '@/actions/song.actions';

export async function GET(req: Request) {
  try {
    const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));
    const song = await getSong(id);
  
    return NextResponse.json(song)
  } catch (error) {
    return NextResponse.json({
      message: "Song not found"
    })
  }
}

export async function PUT(req: Request, res: Response) {
  const song: SongPostData = await req.json();
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));

  try {
    const newSong = await updateSong(song, id);

    return NextResponse.json({
      user: newSong
    })
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

export async function DELETE(req: Request) {
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));

  try {
    await deleteSong(id);

    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    }, {"status": 500})
  }
}