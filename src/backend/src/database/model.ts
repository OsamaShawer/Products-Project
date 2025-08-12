import mongoose, {Document, Schema} from "mongoose";

interface UserInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }
});

const userModel = mongoose.model<UserInterface>("Users", userSchema);

export default userModel;