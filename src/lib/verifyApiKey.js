// // import connectDB from "@/lib/db";
// // import FreeApiAccess from "@/models/FreeApi";

// import FreeApiAccess from "@/models/FreeApi";
// import connectDB from "./db";

// export async function verifyAndConsumeCredits(req, type) {
//   await connectDB();

//   const apiKey = req.headers.get("x-api-key");
//   if (!apiKey) {
//     return { error: "API key missing", status: 401 };
//   }

//   const user = await FreeApiAccess.findOne({ apiKey });

//   if (!user) {
//     return { error: "Invalid API key", status: 403 };
//   }

//   // ===== TEXT API =====
//   if (type === "text") {
//     if (user.freeTextCredits > 0) {
//       user.freeTextCredits -= 1;
//     } else if (user.paidCredits > 0) {
//       user.paidCredits -= 1;
//     } else {
//       return { error: "No text credits remaining", status: 402 };
//     }
//   }

//   // ===== IMAGE API =====
//   if (type === "image") {
//     if (user.freeImageCredits > 0) {
//       user.freeImageCredits -= 1;
//     } else if (user.paidCredits > 0) {
//       user.paidCredits -= 1;
//     } else {
//       return { error: "No image credits remaining", status: 402 };
//     }
//   }

//   user.totalUsage += 1;
//   await user.save();

//   return { user };
// }


import FreeApiAccess from "@/models/FreeApi";
import connectDB from "./db";

export async function verifyApiKey(req, type) {
  await connectDB();

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) return { error: "API key missing", status: 401 };

  const user = await FreeApiAccess.findOne({ apiKey });
  if (!user) return { error: "Invalid API key", status: 403 };

  // ONLY CHECK (no deduction)
  if (type === "text") {
    if (user.freeTextCredits <= 0 && user.paidCredits <= 0)
      return { error: "No text credits remaining", status: 402 };
  }

  if (type === "image") {
    if (user.freeImageCredits <= 0 && user.paidCredits <= 0)
      return { error: "No image credits remaining", status: 402 };
  }

  return { user };
}
export async function consumeCredit(user, type) {

  if (type === "text") {
    if (user.freeTextCredits > 0) user.freeTextCredits--;
    else user.paidCredits--;
  }

  if (type === "image") {
    if (user.freeImageCredits > 0) user.freeImageCredits--;
    else user.paidCredits--;
  }

  user.totalUsage++;
  await user.save();
}

