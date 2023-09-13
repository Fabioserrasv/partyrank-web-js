import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { SongSetService } from './songset.service';
import { SongSetRequest } from './requests';

export const validateSongSet = new SongSetRequest;
export const setService = new SongSetService;

export async function GET() {
  const users = await setService.getAll();

  return NextResponse.json(users)
}