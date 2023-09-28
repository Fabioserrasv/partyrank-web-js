import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { createUser, getAllUsers } from '@/actions/user.actions';

export async function GET() {
  try {
    const users = await getAllUsers();
  
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({
      message: "User Not Found"
    })
  }
}

export async function POST(req: Request, res: Response) {
  const user: UserPostData = await req.json();
  
  try {
    const newUser = await createUser(user);
    
    return NextResponse.json({
      user: newUser
    }, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({
          message: "Duplicated username"
        })
      }
    }
  }
}