import { UserModel, SessionModel } from "./users.model.js";

async function remove(id) {
  return await UserModel.findByIdAndDelete(id);
}

// Should be implemented so that there can't exist users with the same name
async function add(user) {
  return new UserModel(user).save();
}

const findUserByName = async (name) => {
  return await UserModel.findOne({ name });
};

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

export { add, remove, findUserByName, getSessionExpiration };
