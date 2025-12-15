import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

// Create JWT
export function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Set Cookie
export function setTokenCookie(res, token) {
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

// CLEAR COOKIE
export function clearTokenCookie(res) {
  res.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    //secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

// ✅ FIXED verifyToken (THIS WAS MISSING)
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
