import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  passwordConfirmed: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const UserModel = mongoose.model("User", userSchema);
const SessionModel = mongoose.connection.collection(
  process.env.DB_COLLECTION_SESSIONS
);

export { UserModel, SessionModel };
