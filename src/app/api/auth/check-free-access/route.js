// import { NextResponse } from "next/server";
// import FreeAccessIP from "@/models/FreeAccessIP";
// import connectDB from "@/lib/db";

// export async function POST(req) {
//   await connectDB();
//  // ✅ JSON body read karna
//   const body = await req.json();
//   const { type } = body; // tumhara type yahan milega
//   console.log("Requested Type:", type);
//   const forwarded = req.headers.get("x-forwarded-for");
//   const ip = forwarded ? forwarded.split(",")[0].trim() : null;
//   console.log("IP Address:", ip);

//   if (!ip || !type) {
//     return NextResponse.json({ allowed: false });
//   }

//   const exists = await FreeAccessIP.findOne({ ip, type });
//   if (exists) {
//     return NextResponse.json({ allowed: false });
//   }

//   await FreeAccessIP.create({ ip, type });

//   return NextResponse.json({ allowed: true });
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import FreeAccess from "@/models/FreeAccessIP";

// export async function POST(req) {
//   await connectDB();

//   try {
//     // ✅ JSON body read karna
//     const body = await req.json();
//     const { type } = body;

//     if (!type) {
//       return NextResponse.json({ allowed: false, message: "Type is required" });
//     }

//     // ✅ IP nikalna
//     const forwarded = req.headers.get("x-forwarded-for");
//     const ip = forwarded ? forwarded.split(",")[0].trim() : null;
//     console.log("IP Address:", ip, "Requested Type:", type);

//     if (!ip) {
//       return NextResponse.json({ allowed: false, message: "IP not detected" });
//     }

//     // ✅ Duplicate check: agar same IP aur same type already exists
//     const exists = await FreeAccessIP.findOne({ ip, type });
//     if (exists) {
//       return NextResponse.json({ allowed: false, message: "Already used for this type" });
//     }

//     // ✅ Save new IP + type
//     await FreeAccessIP.create({ ip, type });

//     return NextResponse.json({ allowed: true, message: "Access granted" });

//   } catch (error) {
//     console.error("Error in free access API:", error);
//     return NextResponse.json({ allowed: false, message: "Server error" });
//   }
// }
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { type } = body;
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "::1";

  if (!ip || !type) return NextResponse.json({ allowed: false });

  try {
    const exists = await FreeAccess.findOne({ ip, type });
    if (exists) return NextResponse.json({ allowed: false });

    await FreeAccess.create({ ip, type });
    return NextResponse.json({ allowed: true });
  } catch (err) {
    console.error("Error in free access API:", err);
    return NextResponse.json({ allowed: false });
  }
}

