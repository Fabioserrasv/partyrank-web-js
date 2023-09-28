import { NextResponse } from 'next/server';
import { getAllScoreFromSong } from '@/actions/score.actions';

export async function GET(req: Request, res: Response){
  try {
    const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));
    const scores = await getAllScoreFromSong(id);
  
    return NextResponse.json(scores)
  } catch (error) {
    return NextResponse.json({
      message: "Scores Not Found"
    })
  }
}