import { updateUserPicture } from '@/actions/user.actions'
import { NextRequest, NextResponse } from 'next/server'

// https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    
    const response = await updateUserPicture(file)
    
    return NextResponse.json({response})
  } catch (error) {
    throw error;
  }
}
