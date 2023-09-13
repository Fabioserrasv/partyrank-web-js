import { NextResponse } from 'next/server';
import { userService, validateUser } from '../route';
import { Prisma } from '@prisma/client';

export async function GET(req: Request) {
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));
  const users = await userService.getUser(id);

  return NextResponse.json(users)
}

export async function PUT(req: Request) {
  const user: UserPostData = await req.json();
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));

  // Validating the user (must improve, searching for libraries)
  if (!validateUser.rules(user)) {
    return NextResponse.json({
      message: "Invalid data"
    })
  }

  try {
    const newUser = await userService.update(user, id);

    return NextResponse.json({
      user: newUser
    })
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

export async function DELETE(req: Request) {
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));

  try {
    await userService.removeUser(id);

    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    }, {"status": 500})
  }

}