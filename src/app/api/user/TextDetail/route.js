// app/api/auth/signup/route.js
import connectDB from "@/lib/db";
import TextModel from "@/models/Text.model";
import cloudinary from "cloudinary";
// import ImageModel from "@/models/Image.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to DB
    await connectDB();

    // Parse request body
    const { userId, text, label, confidence } = await req.json();
    // console.log("data",userId,image,label,AiGenerated,HumanGenerated);
    if (!userId || !text || !label || !confidence) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

   
    let textDetail = TextModel.create({
        userId,
        text,
        label,
        confidence
    })

     return NextResponse.json(
      { message: "Text Data set successfully", textDetail },
      { status: 201 }
    );
  } catch (err) {
    console.error("Image Model error:", err);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}


export async function GET(request){
try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("userIds of TextDetail",userId);
      // Connect to the database
    await connectDB();
    let textDetail;
    if (userId) {
        // Fetch user by userId
    textDetail = await TextModel.find({ userId: userId }).sort({ createdAt: -1 });

    }else{
        textDetail = await TextModel.find({ }).sort({ createdAt: -1 });
    }
      return NextResponse.json(
      { textDetail },
      { status: 200 }
    );
} catch (error) {
     return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
}
}
