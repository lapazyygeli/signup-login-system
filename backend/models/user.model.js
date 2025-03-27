import mongoose from "mongoose";
const COLLECTION_NAME_USERS = "users";

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  passwordConfirmed: String,
});

const userModel = mongoose.model(COLLECTION_NAME_USERS, userSchema);

export default userModel;
