import { NextRequest, NextResponse } from 'next/server';
import { EnumTokens } from '@/services/auth/auth.service';

export async function middleware(request: NextRequest, response: NextResponse) {
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
