import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { deleteSongSet, getSongSet, updateSongSet } from '@/actions/songset.actions';

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = Number(url.pathname.slice(url.pathname.lastIndexOf('/') + 1));
  let generateJsonParam = (new URL(req.url)).searchParams.get('generate-json');
  let generateJson = generateJsonParam != null && generateJsonParam == '1'? true : false;
  
  try {
    const sets = await getSongSet(id, generateJson);
    
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

  try {
    const newSet = await updateSongSet(set, id);

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
    await deleteSongSet(id);

    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    }, {"status": 500})
  }
}