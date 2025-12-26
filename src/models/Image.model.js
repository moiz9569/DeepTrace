// Agar tum mongoose schema use kar rahe ho
import mongoose from "mongoose";

const ImageModelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String, required: true },
  label: { type: String, required: true },
  AiGenerated: { type: Number, required: true },
  HumanGenerated: { type: Number, required: true },
},{timestamps:true});


const ImageModel = mongoose.models.ImageModel || mongoose.model("ImageModel", ImageModelSchema);
export default ImageModel;