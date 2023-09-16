import { NextResponse } from 'next/server';
import { scoreService, validateScore } from '../route';
import { Prisma } from '@prisma/client';

export async function GET(req: Request, res: Response){
  try {
    const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));
    const scores = await scoreService.getAllScoreFromSong(id);
  
    return NextResponse.json(scores)
  } catch (error) {
    return NextResponse.json({
      message: "Scores Not Found"
    })
  }
}