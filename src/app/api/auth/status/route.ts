import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const TOKEN_EXPIRY_BUFFER_MS = 2 * 60 * 60 * 1000;
  const accessToken = req.cookies.get('access_token')?.value || null;
  const refreshToken = req.cookies.get('refresh_token')?.value || null;
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';
  const tokenExpiresAtRaw = req.cookies.get('token_expires_at')?.value || null;

  const tokenExpiresAt = tokenExpiresAtRaw ? Number(tokenExpiresAtRaw) : null;
  const currentTime = Date.now();

  const timeLeftMs = tokenExpiresAt ? tokenExpiresAt - currentTime : null;

  const hasValidAccessToken =
    Boolean(accessToken) && tokenExpiresAt !== null && timeLeftMs !== null && timeLeftMs > 0;

  const shouldRefresh =
    !hasValidAccessToken || (timeLeftMs !== null && timeLeftMs <= TOKEN_EXPIRY_BUFFER_MS);

  return NextResponse.json({
    isAuthenticated,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    shouldRefresh
  });
}
