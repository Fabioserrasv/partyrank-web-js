import { NextResponse } from 'next/server';
import { songService, validateSong } from '../route';
import { Prisma } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));
    const sets = await songService.get(id);
  
    return NextResponse.json(sets)
  } catch (error) {
    return NextResponse.json({
      message: "Song not found"
    })
  }
}

export async function PUT(req: Request, res: Response) {
  const song: SongPostData = await req.json();
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));

  // Validating the song (must improve, searching for libraries)
  if (!validateSong.rules(song)) {
    return NextResponse.json({
      message: "Invalid data"
    })
  }

  try {
    const newSong = await songService.update(song, id);

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
    await songService.delete(id);

    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    }, {"status": 500})
  }
}