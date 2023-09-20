import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { SongSetService } from '../../services/songset.service';
import { SongSetRequest } from './requests';
import { createSongSet, getAllSongSets } from '../../repositories/songset.repository';

export const validateSongSet = new SongSetRequest;
export const setService = new SongSetService;

export async function GET() {
  try {
    const sets = await getAllSongSets();

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