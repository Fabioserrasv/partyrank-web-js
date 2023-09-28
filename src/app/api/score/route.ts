import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { createScore } from '@/actions/score.actions';

export async function POST(req: Request, res: Response) {
  const score: ScorePost = await req.json();
  
  try {
    const newScore = createScore(score);

    return NextResponse.json({
      score: newScore
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