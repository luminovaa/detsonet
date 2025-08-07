import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/admin/sign-in'];
const adminPrefix = '/admin';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const pathname = request.nextUrl.pathname;

  const redirectToLogin = () => {
    const loginUrl = new URL('/admin/sign-in', request.url);
    return NextResponse.redirect(loginUrl);
  };

  const redirectToDashboard = () => {
    const dashboardUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  };

  // Jika sudah login, cegah akses ke sign-in
  if (pathname === '/admin/sign-in' && token) {
    return redirectToDashboard();
  }

  // Untuk rute admin: wajib ada token
  if (pathname.startsWith(adminPrefix) && !publicRoutes.includes(pathname)) {
    if (!token) {
      return redirectToLogin();
    }
    // Tidak verifikasi isi token — biarkan backend handle 401
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};