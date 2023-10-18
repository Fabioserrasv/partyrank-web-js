import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';

const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`


export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (isRoute(request, "/api/user") && request.method == 'POST' && !request.nextauth.token?.admin) {
      return NextResponse.json({ "message": "Access denied" }, { status: 403 })
    }

    const requestHeaders = new Headers(request.headers)

    // Setting request headers
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set(
      'Content-Security-Policy',
      // Replace newline characters and spaces
      cspHeader.replace(/\s{2,}/g, ' ').trim()
    )

    return NextResponse.next({
      headers: requestHeaders,
      request: {
        headers: requestHeaders,
      },
    })
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  },
)

export const config = {
  matcher: [
    "/api/user/:path*",
    "/api/score/:path*",
    "/api/song/:path*",
    "/api/song-sets/:path*",
    "/api/user-auth",
    "/home",
    "/songsets/:path*",
    "/profile",
  ]
}

function isRoute(request: NextRequestWithAuth, path: string) {
  return request.nextUrl.pathname.startsWith(path)
}