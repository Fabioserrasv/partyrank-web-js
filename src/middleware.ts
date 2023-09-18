import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (isRoute(request, "/api/user") && request.method == 'POST' && !request.nextauth.token?.admin) {
      return NextResponse.json({ "message": "Access denied" }, { status: 403 })
    }

    if (routes.includes(request.nextUrl.pathname)){
      return NextResponse.json({ "message": "Access denied" }, { status: 403 });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

const routes = [
  "/api/user",
  "/api/score",
  "/api/song",
  "/api/song-sets",
  "/api/user-auth"
]

export const config = {
  matcher: routes
}

function isRoute(request: NextRequestWithAuth, path: string){
  return request.nextUrl.pathname.startsWith(path)
}