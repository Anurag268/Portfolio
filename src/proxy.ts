import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await verifySession(request);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If logged in, redirect away from login page
  if (pathname === '/admin/login') {
    const session = await verifySession(request);
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
