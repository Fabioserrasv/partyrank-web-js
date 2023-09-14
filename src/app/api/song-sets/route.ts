import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { SongSetService } from './songset.service';
import { SongSetRequest } from './requests';

export const validateSongSet = new SongSetRequest;
export const setService = new SongSetService;

export async function GET() {
  const users = await setService.getAll();

  return NextResponse.json(users)
}

export async function POST(req: Request, res: Response) {
  const set: SongSetPostData = await req.json();

  // Validating the set (must improve, searching for libraries)
  if (!validateSongSet.rules(set)) {
    return NextResponse.json({
      message: "Invalid data"
    })
  }

  try {
    const newSet = await setService.create(set);

    return NextResponse.json({
      user: newSet
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