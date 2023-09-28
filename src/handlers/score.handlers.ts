
import { createScore } from "@/actions/score.actions";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { FormVote } from "@/app/songsets/vote/[id]/clientPage";
import { getServerSession } from "next-auth";

export async function handleScoreFormSubmit(data: FormVote) {
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
    throw error
  }
}