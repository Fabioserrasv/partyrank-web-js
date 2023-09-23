import { options } from "@/app/api/auth/[...nextauth]/options";
import { ScoreRequest } from "@/app/api/score/request";
import { FormVote } from "@/app/songsets/vote/[id]/clientPage";
import { ScoreService } from "@/services/score.service";
import { getServerSession } from "next-auth";

export function convertDbScoreToModel(data: any) {
  return {
    id: data.id,
    songId: data.songId,
    userId: data.userId,
    value: data.value,
    videoTimeStamp: data.videoTimeStamp,
    valid: data.valid
  }
}

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

export async function handleFormSubmit(data: FormVote) {
  "use server"
  
  try {
    const session = await getServerSession(options);
    
    const newScore = await createScore({
      songId: Number(data.id),
      userId: session?.user.id as number,
      value: Number(data.score),
      videoTimeStamp: Number(data.timeStamp)
    })
    return newScore.id
  } catch (error) {
    return false
  }
}