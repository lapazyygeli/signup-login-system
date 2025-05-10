import Lists from "./lists.model.js";

// All operations are related to the given user

async function getAll(userId) {
  return Lists.find({ userId: userId });
}

async function get(id, userId) {
  return Lists.findOne({ _id: id, userId: userId });
}

async function create(data, userId) {
  return new Lists({ ...data, userId: userId }).save();
}

async function update(id, data, userId) {
  return Lists.findOneAndUpdate({ _id: id, userId: userId }, data, { new: true });
}

async function remove(id, userId) {
  return Lists.findOneAndDelete({ _id: id, userId: userId });
}

export { getAll, get, create, update, remove };
