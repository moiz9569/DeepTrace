// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/db";
import User from "../../../../../models/User";
import { createToken, setTokenCookie } from "../../../../../lib/auth";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    // Connect to DB
    await dbConnect();

    // Parse request body
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({ name, email, password });

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



// // app/api/auth/signup/route.js
// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import User from "@/models/User";
// import { createToken, setTokenCookie } from "@/lib/auth";

// export const runtime = "nodejs";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return NextResponse.json({ error: "User already exists" }, { status: 400 });
//     }

//     const user = await User.create({ name, email, password });
//     const token = createToken(user);

//     const res = NextResponse.json(
//       {
//         success: true,
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           plan: user.plan,
//           credits: user.credits,
//         },
//       },
//       { status: 201 }
//     );

//     setTokenCookie(res, token);
//     return res;
//   } catch (err) {
//     console.error("Signup Error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
