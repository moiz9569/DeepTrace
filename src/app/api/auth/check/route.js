// app/api/auth/check/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "../../../../../lib/auth";

export function GET(req) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const decoded = verifyToken(token);

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
