import userModel from "./../models/user.model.js";

// return Promise<query>
// async not necessary, just for reading purposes
async function remove(id) {
  return await userModel.findByIdAndDelete(id);
}

async function add(user) {
  return new userModel(user).save();
}

export { add, remove };
