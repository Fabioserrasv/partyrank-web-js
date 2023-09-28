import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { deleteUser, getUser, updateUserInfo } from '@/actions/user.actions';

export async function GET(req: Request) {
  try {
    const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));
    const users = await getUser(id);
  
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({
      message: "User not found"
    })
  }
}

export async function PUT(req: Request) {
  const user: UserUpdateData = await req.json();
  const id = Number(req.url.slice(req.url.lastIndexOf('/') + 1));

  try {
    const newUser = await updateUserInfo(user, id);

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
    await deleteUser(id);

    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong"
    }, {"status": 500})
  }

}