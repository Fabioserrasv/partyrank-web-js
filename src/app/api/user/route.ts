import { Prisma } from '@prisma/client';
import { NextResponse } from "next/server";
import { UserService } from "./user.service";
import { UserRequest } from './request';

export const validateUser = new UserRequest;
export const userService = new UserService;

export async function GET() {
  try {
    const users = await userService.getAllUsers();
  
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({
      message: "User Not Found"
    })
  }
}

export async function POST(req: Request, res: Response) {
  const user: UserPostData = await req.json();

  // Validating the user (must improve, searching for libraries)
  if (!validateUser.rules(user)) {
    return NextResponse.json({
      message: "Invalid data"
    })
  }
  
  try {
    const newUser = await userService.create(user);
    
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