import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { SongService } from './song.service';
import { SongRequest } from './request';

export const validateSong = new SongRequest;
export const songService = new SongService;

export async function GET() {
  const users = await songService.getAll();

  return NextResponse.json(users)
}

export async function POST(req: Request, res: Response) {
  const song: SongPostData = await req.json();

  // Validating the song (must improve, searching for libraries)
  if (!validateSong.rules(song)) {
    return NextResponse.json({
      message: "Invalid data"
    })
  }

  try {
    const newSong = await songService.create(song);

    return NextResponse.json({
      user: newSong
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