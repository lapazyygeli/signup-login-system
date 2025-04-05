import userModel from "./../models/user.model.js";

const findUserByName = async (name) => {
  return await userModel.findOne({ name });
};

export { findUserByName };