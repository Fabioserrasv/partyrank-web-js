import { options } from "@/app/api/auth/[...nextauth]/options";
import { ScoreRequest } from "@/app/api/score/request";
import { ScoreService } from "@/services/score.service";
import { getServerSession } from "next-auth";

export async function createScore(score: ScorePost) {
  const validateScore = new ScoreRequest;
  const scoreService = new ScoreService;

  const session = await getServerSession(options);
  score.userId = session?.user.id as number

  // Validating the score (must improve, searching for libraries)
  if (!validateScore.rules(score)) {
    throw new Error("Invalid data")
  }

  return await scoreService.create(score);
}


export async function getAllScoreFromSong(id: number) {
  const scoreService = new ScoreService;
  try {
    const scores = await scoreService.getAllScoreFromSong(id);

    return scores
  } catch (error) {
    throw error;
  }
}