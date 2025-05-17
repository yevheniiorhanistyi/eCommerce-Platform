import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(_req: NextRequest) {
  const response = NextResponse.json({ success: true });

  response.cookies.set('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  });

  response.cookies.set('refresh_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  });

  response.cookies.set('is_authenticated', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  });

  return response;
}
