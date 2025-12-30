// app/api/auth/check/route.js
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
// import { verifyToken } from "../../../../../lib/auth";

export function GET(req) {
  const token = req.cookies.get("auth_token")?.value;
  console.log('Auth token from cookies:', token);
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const decoded = verifyToken(token);
  console.log('Decoded token:', decoded);
  if (!decoded) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: decoded,
    },
    { status: 200 }
  );
}
