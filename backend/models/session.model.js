import mongoose from "mongoose";

const SessionModel = mongoose.connection.collection("sessions");

export default SessionModel;
