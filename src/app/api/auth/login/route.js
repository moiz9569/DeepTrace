// app/api/auth/login/route.js
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import { createToken, setTokenCookie } from '@/lib/auth';
import UserModel from '@/models/User.model';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // password is select:false in schema, so +password required
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const match = await user.matchPassword(password);
    if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    user.lastLogin = new Date();
    await user.save();

    const token = createToken(user);
    const res = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
        credits: user.credits,
      },
    }, { status: 200 });

    setTokenCookie(res, token);
    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
