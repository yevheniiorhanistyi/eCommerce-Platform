import { NextRequest, NextResponse } from 'next/server';
import { tokenServiceInstance } from '@/services/commercetools/token/TokenService';
import { createRefreshTokenClient } from '@/services/commercetools/client/createRefreshTokenClient';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value || null;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token not found' },
        { status: 401 }
      );
    }

    tokenServiceInstance.clear();

    const client = createRefreshTokenClient(refreshToken);
    await client.me().get().execute();

    const tokenStore = tokenServiceInstance.get();

    if (!tokenStore?.token || !tokenStore?.expirationTime) {
      return NextResponse.json(
        { success: false, message: 'Failed to refresh token' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set('access_token', tokenStore.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Math.floor((tokenStore.expirationTime - Date.now()) / 1000),
      path: '/'
    });

    response.cookies.set('token_expires_at', tokenStore.expirationTime.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Refresh error:', error);

    return NextResponse.json({ success: false, message: 'Refresh failed' }, { status: 401 });
  }
}
