import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/dashboard/:path*',
    '/hi'
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If user is authenticated and tries to access sign-in, sign-up, verify, or home, redirect to dashboard
  if (
    token &&
    (url.pathname === '/' ||
      url.pathname.startsWith('/sign-in') ||
      // url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/hi',
    '/sign-up'
  ];

  // If user is not authenticated and tries to access protected routes, redirect to sign-in
  if (
    !token &&
    protectedRoutes.some(route => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}