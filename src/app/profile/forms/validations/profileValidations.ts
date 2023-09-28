import { z } from 'zod';


export const changeUserInfoSchema = z.object({
  animelist: z.string(),
  username: z.string()
})