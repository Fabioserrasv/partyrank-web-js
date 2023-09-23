import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';


export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (isRoute(request, "/api/user") && request.method == 'POST' && !request.nextauth.token?.admin) {
      return NextResponse.json({ "message": "Access denied" }, { status: 403 })
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: [
    "/api/user/:path*",
    "/api/score/:path*",
    "/api/song/:path*",
    "/api/song-sets/:path*",
    "/api/user-auth",
    "/home",
    "/songsets/:path*"
  ]
}

function isRoute(request: NextRequestWithAuth, path: string) {
  return request.nextUrl.pathname.startsWith(path)
}