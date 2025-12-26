// app/api/auth/logout/route.js
import { clearTokenCookie } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  const res = NextResponse.json({ success: true });
  clearTokenCookie(res);
  return res;
}
