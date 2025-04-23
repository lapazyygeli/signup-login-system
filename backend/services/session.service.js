import SessionModel from "../models/session.model.js";

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

export { getSessionExpiration };
