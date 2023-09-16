import { NextResponse } from 'next/server';
import { setService, validateSongSet } from '../route';
import { Prisma } from '@prisma/client';

export async function GET(req: Request) {
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));
  try {
    const sets = await setService.get(id);
    
    return NextResponse.json(sets)
  } catch (error) {
    return NextResponse.json({
      message: "Song Set not found"
    })
  }
}

export async function PUT(req: Request, res: Response) {
  const set: SongSetPostData = await req.json();
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));

  // Validating the set (must improve, searching for libraries)
  if (!validateSongSet.rules(set)) {
    return NextResponse.json({
      message: "Invalid data"
    })
  }

  try {
    const newSet = await setService.update(set, id);

    return NextResponse.json({
      user: newSet
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
    await setService.delete(id);

    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    }, {"status": 500})
  }
}