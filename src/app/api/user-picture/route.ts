// import { NextResponse } from "next/server";
// import { userService } from "../user/route";
// import { getServerSession } from "next-auth";
// import { options } from "../auth/[...nextauth]/options";

// export async function POST(req: Request) {
//   try {
//     const data: UserProfilePicturePost = await req.json();
//     const session = await getServerSession(options);

//     userService.updateProfilePicture(data.imageUrl, session?.user.id as number)

//     return NextResponse.json({})
//   } catch (error) {
//     return NextResponse.json({
//       message: "Error updating profile picture"
//     })
//   }
// }