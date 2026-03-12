import { z } from 'zod';

export const scoreVoteSchema = z.object({
  score: z.string().pipe(z.coerce.number()),
  timeStamp: z.string().pipe(z.coerce.number())
})

export const createSongSetSchema = z.object({
  name: z.string(),
  anilistLink: z.string().optional()
})

export const addSongSchema = z.object({
  anime: z.string().min(1, "*"),
  artist: z.string().min(1, "*"),
  name: z.string().min(1, "*"),
  link: z.string().min(1, "*"),
  imageUrl: z.nullable(z.string()).optional(),
  type: z.string().min(1, "*"),
  pickedById: z.coerce.string().optional()
})

export const songFinderSchema = z.object({
  query: z.string(),
  songName: z.string().optional(),
  artistName: z.string().optional(),
  serviceName: z.string().optional(),
})

export const inviteUserSchema = z.object({
  username: z.string().min(1)
})

export const songSetUpdateSchema = z.object({
  status: z.string().optional(),
  type: z.string().optional(),
  scoreSystem: z.string().optional(),
  pickSystem: z.string().optional(),
})