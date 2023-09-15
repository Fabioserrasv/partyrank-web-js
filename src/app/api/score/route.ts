import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { ScoreService } from './score.service';
import { ScoreRequest } from './request';
import { getServerSession } from "next-auth/next";

export const validateScore = new ScoreRequest;
export const scoreService = new ScoreService;

export async function POST(req: Request, res: Response) {
  const score: ScorePost = await req.json();

  // Validating the score (must improve, searching for libraries)
  if (!validateScore.rules(score)) {
    return NextResponse.json({
      message: "Invalid data"
    })
  }

  try {
    const newScore = await scoreService.create(score);

    return NextResponse.json({
      user: newScore
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