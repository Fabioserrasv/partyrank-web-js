import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { SongService } from '../../../services/song.service';
import { SongRequest } from './request';
import { createSong } from '@/repositories/song.repository';

export const validateSong = new SongRequest;
export const songService = new SongService;

export async function GET() {
  try {
    const users = await songService.getAll();
  
    return NextResponse.json(users)
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