// import { verifyAndConsumeCredits } from "@/lib/verifyApiKey";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//  // 1️⃣ body read karo (user ka text)
//   const body = await req.json();
//   const { text } = body;
//    if (!text) {
//     return NextResponse.json(
//       { success: false, error: "Text is required" },
//       { status: 400 }
//     );
//   }
//   const check = await verifyAndConsumeCredits(req, "text");

//   if (check.error) {
//     return NextResponse.json(
//       { success: false, error: check.error },
//       { status: check.status }
//     );
//   }

//   // 👉 HUGGING FACE CALL
// //   const hfRes = await fetch("https://mohitai24-image-detector-model.hf.space/predict", {
// //     method: "POST",
// //     headers: {
// //       Authorization: `Bearer ${process.env.HF_TOKEN}`,
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(await req.json()),
// //   });

// const client = await Client.connect("MohitAI24/ai-text-detector");

//       const result = await client.predict("/classify_text", {
//         text: inputText,
//       });
//       console.log("result", result);

// //   const result = await hfRes.json();

//   return NextResponse.json({
//     success: true,
//     data: result,
//     creditsLeft: check.user.freeTextCredits,
//   });
// }


// import { verifyApiKey, consumeCredit } from "@/lib/verifyApiKey";
import { NextResponse } from "next/server";
import { Client } from "@gradio/client";
import { consumeCredit, verifyApiKey } from "@/lib/verifyApiKey";

export async function POST(req) {

  // 1️⃣ Read body
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json(
      { success: false, error: "Text is required" },
      { status: 400 }
    );
  }

  // 2️⃣ VERIFY ONLY (no deduction yet)
  const check = await verifyApiKey(req, "text");
  if (check.error) {
    return NextResponse.json(
      { success: false, error: check.error },
      { status: check.status }
    );
  }

  try {
    // 3️⃣ HuggingFace call
    const client = await Client.connect("MohitAI24/ai-text-detector");

    const result = await client.predict("/classify_text", {
      text: text,
    });

    // 4️⃣ SUCCESS → NOW deduct credit
    await consumeCredit(check.user, "text");

    return NextResponse.json({
      success: true,
      data: result,
      creditsLeft: check.user.freeTextCredits,
    });

  } catch (err) {
    console.error("HF ERROR:", err);

    // ❌ No deduction if AI failed
    return NextResponse.json(
      { success: false, error: "AI processing failed" },
      { status: 500 }
    );
  }
}
