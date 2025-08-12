import mongoose, { Document, Schema } from "mongoose";

interface InfoInter {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }
});

const userModel = mongoose.model<InfoInter>("Users", userSchema);

export default userModel;