import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  plan: { type: String, default: "free" },
  credits: { type: Number, default: 20 },
});

// Mongoose 7+ no longer uses next()
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// export default mongoose.models.User || mongoose.model("User", UserSchema);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;