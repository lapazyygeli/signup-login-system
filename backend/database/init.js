import mongoose from "mongoose";

export async function connectDB() {
  try {
    // DB_URL directly to this, if trying node server.js resulting to an error
    await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected successfully: ${mongoose.connection.db.databaseName}!`);
  } catch (err) {
    console.log(`Something bad happened: ${err}`);
  }
}