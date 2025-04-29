import { UserModel, SessionModel } from "./users.model.js";

async function getUsers() {
  return await UserModel.find();
}

async function add(user) {
  return new UserModel(user).save();
}

async function remove(id) {
  return await UserModel.findByIdAndDelete(id);
}

async function findUserByName(name) {
  return await UserModel.findOne({ name });
}

async function getSessionExpiration(sessionID) {
  const sessionDoc = await SessionModel.findOne({ _id: sessionID });
  const sessionObj = JSON.parse(sessionDoc.session);

  if (sessionObj.cookie && sessionObj.cookie.expires) {
    const expiresAt = new Date(sessionObj.cookie.expires).getTime();
    return expiresAt;
  } else {
    console.error("No expiration found for this session.");
    return null;
  }
}

export { getUsers, add, remove, findUserByName, getSessionExpiration };
