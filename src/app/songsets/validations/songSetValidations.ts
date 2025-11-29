import { z } from 'zod';

export const scoreVoteSchema = z.object({
  score: z.string(),
  timeStamp: z.string()
})

export const createSongSetSchema = z.object({
  name: z.string(),
  anilistLink: z.string()
})

export const addSongSchema = z.object({
  anime: z.string().min(1, "*"),
  artist: z.string().min(1, "*"),
  name: z.string().min(1, "*"),
  link: z.string().min(1, "*"),
  imageUrl: z.nullable(z.string()).optional(),
  type: z.string().min(1, "*"),
  pickedById: z.string().optional()
})

export const songFinderSchema = z.object({
  query: z.string(),
  songName: z.string(),
  artistName: z.string(),
  serviceName: z.string(),
})

export const inviteUserSchema = z.object({
  username: z.string().min(1)
})

export const songSetUpdateSchema = z.object({
  status: z.string(),
  type: z.string(),
  scoreSystem: z.string(),
  pickSystem: z.string(),
})