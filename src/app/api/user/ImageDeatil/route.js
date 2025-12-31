// app/api/auth/signup/route.js
import connectDB from "@/lib/db";
import cloudinary from "cloudinary";
import ImageModel from "@/models/Image.model";
import { NextResponse } from "next/server";

// Cloudinary config
cloudinary.v2.config({
  cloud_name: "dfyvwloys",
  api_key: "923835526253933",
  api_secret: "JeNHRhqCYIfpkgu9hVcjwgf3P4A",
});
export async function POST(req) {
  try {
    // Connect to DB
    await connectDB();

    // Parse request body
    const { userId, image, label,AiGenerated,HumanGenerated, size } = await req.json();
    // console.log("data",userId,image,label,AiGenerated,HumanGenerated);
    if (!userId || !image || !label || !AiGenerated || !HumanGenerated || !size) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    let imageUrl = ""; // Default image if none uploaded

    // If image is base64 and provided, upload it to Cloudinary
    if (image) {
      try {
        const uploadedResponse = await cloudinary.v2.uploader.upload(
          image,
          {
            folder: "deep_trace_image",
            transformation: [
              { width: 1024, height: 1024, crop: "limit" }, // Resize to max 1024px
              { quality: "auto", fetch_format: "auto" }, // Compress and auto format
            ],
          }
        );
        imageUrl = uploadedResponse.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return NextResponse.json(
          {
            error:
              "Image upload failed. Please use an image smaller than 10MB and in a supported format (JPG, PNG, etc).",
          },
          { status: 400 }
        );
      }
    }

    let imageDetail = ImageModel.create({
        userId,
        image : imageUrl,
        label,
        AiGenerated,
        HumanGenerated,
        size
    })

     return NextResponse.json(
      { message: "Image Data set successfully", imageDetail },
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
    console.log("userIds",userId);
      // Connect to the database
    await connectDB();
    let imageDetail;
    if (userId) {
        // Fetch user by userId
    imageDetail = await ImageModel.find({ userId: userId }).sort({createdAt: -1});

    }else{
        imageDetail = await ImageModel.find({ }).sort({ createdAt: -1 });
    }
      return NextResponse.json(
      { imageDetail },
      { status: 200 }
    );
} catch (error) {
     return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
}
}
