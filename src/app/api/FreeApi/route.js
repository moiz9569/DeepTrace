import connectDB from "@/lib/db";
import FreeApiAccess from "@/models/FreeApi";
import { NextResponse } from "next/server";
import crypto from "crypto";

// unique api key generator
async function generateUniqueApiKey() {
  let apiKey;
  let exists = true;

  while (exists) {
    apiKey = "sk_live_" + crypto.randomBytes(24).toString("hex");
    const user = await FreeApiAccess.findOne({ apiKey });
    if (!user) exists = false;
  }

  return apiKey;
}

export async function POST(req) {
  try {
    await connectDB();

    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // pehle check karo email
    const existingApiUser = await FreeApiAccess.findOne({ email });
    if (existingApiUser) {
      return NextResponse.json(
        { success: false, error: "Api already exists for this email" },
        { status: 400 }
      );
    }

    // ab unique key generate
    const apiKey = await generateUniqueApiKey();

    // create user
    const user = await FreeApiAccess.create({
      name,
      email,
      apiKey,
      freeCredits: 15,
      paidCredits: 0,
      totalUsage: 0,
    });

    return NextResponse.json(
      {
        success: true,
        apiKey: user.apiKey,
        freeCredits: user.freeCredits,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Api Generating error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const apiUsers = await FreeApiAccess.find({}, "-password -__v -apiKey").lean();
    return NextResponse.json({ success: true, data: apiUsers }, { status: 200 });
  } catch (err) {
    console.error("Api Fetching error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  } 
}