// Agar tum mongoose schema use kar rahe ho
import mongoose from "mongoose";

const FreeAccessIPSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  type: { type: String, required: true },
});

// Compound unique index
FreeAccessIPSchema.index({ ip: 1, type: 1 }, { unique: true });

const FreeAccess = mongoose.models.FreeAccess || mongoose.model("FreeAccess", FreeAccessIPSchema);

export default FreeAccess;