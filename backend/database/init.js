import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/", {
      dbName: "MernDb",
    });
    console.log(`Database connected successfully: ${mongoose.connection.db.databaseName}!`);
  } catch (err) {
    console.log(`Something bad happened: ${err}`);
  }
}