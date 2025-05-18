import { NextRequest, NextResponse } from 'next/server';
import { tokenServiceInstance } from '@/services/commercetools/token/TokenService';
import { createAuthenticatedClient } from '@/services/commercetools/client/createAuthenticatedClient';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const client = createAuthenticatedClient(email, password);

    await client
      .me()
      .login()
      .post({
        body: {
          email,
          password,
          activeCartSignInMode: 'MergeWithExistingCustomerCart'
        }
      })
      .execute();

    const tokenStore = tokenServiceInstance.get();

    if (!tokenStore?.token || !tokenStore?.refreshToken || !tokenStore?.expirationTime) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TOKEN_STORE_INVALID',
            message: 'Authentication token could not be retrieved.'
          }
        },
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

    response.cookies.set('refresh_token', tokenStore.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    response.cookies.set('token_expires_at', String(tokenStore.expirationTime), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Math.floor((tokenStore.expirationTime - Date.now()) / 1000),
      path: '/'
    });

    response.cookies.set('is_authenticated', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Incorrect email or password.'
        }
      },
      { status: 401 }
    );
  }
}
