import Tasks from "./tasks.model.js";
import Lists from "../lists/lists.model.js";

async function getAll(userId) {
  const userLists = await Lists.find({ userId: userId }, "_id");
  const listIds = userLists.map((list) => list._id);
  return Tasks.find({ list_id: { $in: listIds } });
}

async function getAllByList(userId, listId) {
  const list = await Lists.findOne({ _id: listId, userId: userId });
  if (!list) return null;
  return await Tasks.find({ list_id: listId });
}

async function get(id, userId) {
  const task = await Tasks.findById(id);
  if (!task) return null;

  const list = await Lists.findOne({ _id: task.list_id, userId: userId });
  return list ? task : null;
}

async function create(data, userId) {
  const list = await Lists.findOne({ _id: data.list_id, userId: userId });
  if (!list) return null;
  return new Tasks(data).save();
}

async function update(id, data, userId) {
  const task = await Tasks.findById(id);
  if (!task) return null;

  const list = await Lists.findOne({ _id: task.list_id, userId: userId });
  if (!list) return null;

  return Tasks.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id, userId) {
  const task = await Tasks.findById(id);
  if (!task) return null;

  const list = await Lists.findOne({ _id: task.list_id, userId: userId });
  if (!list) return null;

  return Tasks.findByIdAndDelete(id);
}

export { getAll, getAllByList, get, create, update, remove };
