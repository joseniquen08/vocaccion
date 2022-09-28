import { NextRequest, NextResponse } from "next/server";
import { TokenType } from './src/types/auth/index';
import decodeToken from './src/utils/decodeToken';

export function middleware (req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin/login')) {
    if (req.cookies.get('token')) {
      const decryptedToken: TokenType = decodeToken(req.cookies.get('token')!);
      if (decryptedToken.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard/inicio', req.url));
      } else if (decryptedToken.role === 'user') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (req.cookies.get('token')) {
      const decryptedToken: TokenType = decodeToken(req.cookies.get('token')!);
      if (decryptedToken.role === 'admin') {
        return NextResponse.next();
      } else if (decryptedToken.role === 'user') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}