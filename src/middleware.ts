import { withAuth, NextRequestWithAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname)
    console.log(request.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({token}) => token?.admin == true
    }
  }
)

export const config = {
  matcher: [
    // "/api/user",
    "/api/score",
    "/api/song",
    "/api/song-sets",
    "/api/user-auth"
  ]
}