import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse, type NextRequest } from 'next/server';


export default withAuth(
  function middleware(request) {
    // if(request.nextUrl.pathname === "/account/register" && request.nextauth.token?.token) {
    //   return NextResponse.redirect(new URL("/", request.url))
    // }
    // if(request.nextUrl.pathname === "/account/login" && request.nextauth.token?.token) {
    //   return NextResponse.redirect(new URL("/", request.url))
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if(token?.token) {
          return true
        }
        return false;
      },
    },
  },
)

export const config = { matcher: ["/dashboard", "/dashboard/(.*)"] }