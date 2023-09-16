import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { userService } from "../user/route";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from 'next-auth';
import { PERMITED_EXTENSIONS } from './user-picture.repository';

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

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const fileName = session?.user.username + '.' + extension;
  const path = `/user_images/${fileName}`
  await writeFile('.' + path, buffer)
  console.log(`open ${path} to see the uploaded file`)
  userService.updateProfilePicture(path, session?.user.id as number)

  return NextResponse.json({ success: true })
}
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";

// export async function POST(req: Request) {
//   try {
//     const data: UserProfilePicturePost = await req.json();


//     return NextResponse.json({})
//   } catch (error) {
//     return NextResponse.json({
//       message: "Error updating profile picture"
//     })
//   }
// }