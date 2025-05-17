import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const isAuthenticated = req.cookies.get('is_authenticated')?.value === 'true';

  return NextResponse.json({ isAuthenticated });
}
