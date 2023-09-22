import { z } from 'zod';

export const scoreVoteSchema = z.object({
  score: z.string(),
  timeStamp: z.string()
})