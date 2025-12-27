
import connectDB from "@/lib/db";
import ImageModel from "@/models/Image.model";
import TextModel from "@/models/Text.model";
import { NextResponse } from "next/server";




export async function GET(request){
try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("userIds",userId);
      // Connect to the database
    await connectDB();
    let textHumanCount,textAICount,imageHumanCount,imageAICount,imageTotalAnalysis,textTotalAnalysis;
   if (userId){
 // ===== TEXT COUNTS =====
     textHumanCount = await TextModel.countDocuments({
      userId,
      label: "Human",
    });

     textAICount = await TextModel.countDocuments({
      userId,
      label: "AI",
    });
     // ===== IMAGE COUNTS =====
     imageHumanCount = await ImageModel.countDocuments({
      userId,
      label: "Human Generated",
    });

     imageAICount = await ImageModel.countDocuments({
      userId,
      label: "AI Generated",
    });
//total Analysis
     imageTotalAnalysis = await ImageModel.countDocuments({ userId });
     textTotalAnalysis = await TextModel.countDocuments({ userId });
    console.log(textHumanCount);
    console.log(textAICount);
    console.log(imageHumanCount);
    console.log(imageAICount);
   }else{
    // ===== TEXT COUNTS =====
     textHumanCount = await TextModel.countDocuments({
      label: "Human",
    });

     textAICount = await TextModel.countDocuments({
      label: "AI",
    });
     // ===== IMAGE COUNTS =====
     imageHumanCount = await ImageModel.countDocuments({
      label: "Human Generated",
    });

     imageAICount = await ImageModel.countDocuments({
      label: "AI Generated",
    });
//total Analysis
     imageTotalAnalysis = await ImageModel.countDocuments({  });
     textTotalAnalysis = await TextModel.countDocuments({  });
    console.log(textHumanCount);
    console.log(textAICount);
    console.log(imageHumanCount);
    console.log(imageAICount);
   }

   return NextResponse.json(
      {
        success: true,
        totals: {
          text: {
            human: textHumanCount,
            ai: textAICount,
          },
          image: {
            human: imageHumanCount,
            ai: imageAICount,
          },
          totalAnalysis:{
            text: textTotalAnalysis,
            image: imageTotalAnalysis
          }
        },
      },
      { status: 200 }
    );
} catch (error) {
     return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
}
}
