import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { userService } from "../user/route";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from 'next-auth';
import { PERMITED_EXTENSIONS } from './user-picture.repository';

// https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  const session = await getServerSession(options);

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const extension = String(file.name.split('.').pop())

  if (!PERMITED_EXTENSIONS.includes(extension)) {
    return NextResponse.json({ success: false, message: "File extension not supported." })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = session?.user.username + '.' + extension;
  const path = `/user_images/${fileName}`
  await writeFile('.' + path, buffer)
  userService.updateProfilePicture(path, session?.user.id as number)

  return NextResponse.json({ success: true })
}
