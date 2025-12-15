// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { clearTokenCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST() {
  const res = NextResponse.json({ success: true });
  clearTokenCookie(res);
  return res;
}
