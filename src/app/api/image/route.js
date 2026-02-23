// import { consumeCredit, verifyApiKey } from "@/lib/verifyApiKey";
// import { NextResponse } from "next/server";

// export async function POST(req) {

//   // 1️⃣ Read body
//   const { image } = await req.json();

//   if (!image) {
//     return NextResponse.json(
//       { success: false, error: "Image is required" },
//       { status: 400 }
//     );
//   }

//   // 2️⃣ VERIFY ONLY (no deduction yet)
//   const check = await verifyApiKey(req, "image");
//   if (check.error) {
//     return NextResponse.json(
//       { success: false, error: check.error },
//       { status: check.status }
//     );
//   }

//   try {

//     // 3️⃣ Call HuggingFace Space properly
//     const response = await fetch(
//       "https://mohitai24-image-detector-model.hf.space/predict",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ image })
//       }
//     );

//     if (!response.ok) {
//       throw new Error("HF request failed");
//     }

//     const result = await response.json();

//     // 4️⃣ SUCCESS → NOW deduct credit
//     await consumeCredit(check.user, "image");

//     return NextResponse.json({
//       success: true,
//       data: result,
//       creditsLeft: check.user.freeImageCredits - 1,
//     });

//   } catch (err) {
//     console.error("HF ERROR:", err);

//     return NextResponse.json(
//       { success: false, error: "AI processing failed" },
//       { status: 500 }
//     );
//   }
// }


// import { consumeCredit, verifyApiKey } from "@/lib/verifyApiKey";
// import { NextResponse } from "next/server";
// import FormData from "form-data";

// export async function POST(req) {

//   // 1️⃣ VERIFY FIRST
//   const check = await verifyApiKey(req, "image");
//   if (check.error) {
//     return NextResponse.json(
//       { success: false, error: check.error },
//       { status: check.status }
//     );
//   }

//   try {
//     const formData = await req.formData();
//     const image = formData.get("file");

//     if (!image) {
//       return NextResponse.json(
//         { success: false, error: "Image is required" },
//         { status: 400 }
//       );
//     }

//     const bytes = await image.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // 👇 Yahan NEW FormData banao
//     const hfFormData = new FormData();
//     hfFormData.append("file", buffer, {
//       filename: image.name,
//       contentType: image.type,
//     });

//     const response = await fetch(
//       "https://mohitai24-image-detector-model.hf.space/predict",
//       {
//         method: "POST",
//         body: hfFormData,
//         headers: hfFormData.getHeaders(),
//       }
//     );

//     // if (!response.ok) {
//     //   throw new Error("HF request failed");
//     // }
//    if (!response.ok) {
//   const errorText = await response.text();
//   console.log("HF STATUS:", response.status);
//   console.log("HF ERROR BODY:", errorText);
//   throw new Error("HF request failed");
// }

//     const result = await response.json();

//     // 4️⃣ Deduct credit AFTER success
//     await consumeCredit(check.user, "image");

//     return NextResponse.json({
//       success: true,
//       data: result,
//       creditsLeft: check.user.freeImageCredits,
//     });

//   } catch (err) {
//     console.error("FULL ERROR:", err);

//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 }
//     );
//   }
// }

import { consumeCredit, verifyApiKey } from "@/lib/verifyApiKey";
import { NextResponse } from "next/server";

export async function POST(req) {

  // 1️⃣ Verify API Key
  const check = await verifyApiKey(req, "image");
  if (check.error) {
    return NextResponse.json(
      { success: false, error: check.error },
      { status: check.status }
    );
  }

  try {

    // 2️⃣ Get incoming formData
    const incomingForm = await req.formData();

    // ⚠️ MUST MATCH FRONTEND FIELD NAME
    const image = incomingForm.get("file");

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Image file missing" },
        { status: 400 }
      );
    }

    // 3️⃣ Create NEW FormData for HuggingFace
    const hfForm = new FormData();
    hfForm.append("file", image); // direct forward

    // 4️⃣ Call HuggingFace
    const response = await fetch(
      "https://mohitai24-image-detector-model.hf.space/predict",
      {
        method: "POST",
        body: hfForm, // ❌ NO headers needed
      }
    );

    // 🔎 DEBUG PRINT
    const rawText = await response.text();
    console.log("HF STATUS:", response.status);
    console.log("HF RESPONSE:", rawText);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: rawText },
        { status: 500 }
      );
    }

    const result = JSON.parse(rawText);

    // 5️⃣ Deduct credit after success
    await consumeCredit(check.user, "image");

    return NextResponse.json({
      success: true,
      data: result,
      creditsLeft: check.user.freeImageCredits,
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}