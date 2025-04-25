import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  passwordConfirmed: String,
});

const UserModel = mongoose.model(process.env.DB_COLLECTION_USERS, userSchema);
const SessionModel = mongoose.connection.collection(process.env.DB_COLLECTION_SESSIONS);

export { UserModel, SessionModel };
