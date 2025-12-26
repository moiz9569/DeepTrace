// app/api/auth/signup/route.js
import { setTokenCookie } from "@/lib/auth";
import connectDB from "@/lib/db";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    // Connect to DB
    await connectDB();

    // Parse request body
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = await UserModel.create({ name, email, password });

    // Generate JWT token
    const token = createToken(user);

    // Prepare response
    const res = NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          plan: user.plan,
          credits: user.credits,
        },
      },
      { status: 201 }
    );

    // Set HTTP-only cookie
    setTokenCookie(res, token);

    return res;
  } catch (err) {
    console.error("Signup API error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

