import { NextResponse } from 'next/server';
import decodeToken from '../../../utils/decodeToken';

export function middleware(req) {
  if (req.cookies['token']) {
    const decryptedToken = decodeToken(req.cookies['token']);
    if (decryptedToken.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard/inicio', req.url));
    } else if (decryptedToken.role === 'user') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return NextResponse.redirect(new URL('/admin/login', req.url));
}
