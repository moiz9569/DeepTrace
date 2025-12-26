// Agar tum mongoose schema use kar rahe ho
import mongoose from "mongoose";

const TextModelSchema = new mongoose.Schema({
  
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  label: { type: String, required: true },
  confidence: { type: Number, required: true },
},{timestamps:true});


const TextModel = mongoose.models.TextModel || mongoose.model("TextModel", TextModelSchema);
export default TextModel;