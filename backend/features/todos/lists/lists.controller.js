import * as listsService from "./lists.service.js";

async function getAll(req, res) {
  try {
    const lists = await listsService.getAll(req.session.userId);
    res.json(lists);
  } catch (err) {
    console.error(`Error while getting the lists:`, err.message);
    res.status(500).json({ error: err.message || "Failed to fetch lists" });
  }
}

async function get(req, res) {
  try {
    const list = await listsService.get(req.params.id, req.session.userId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.json(list);
  } catch (err) {
    console.error(`Error while getting the list:`, err.message);
    res.status(500).json({ error: err.message || "Failed to fetch list" });
  }
}

async function create(req, res) {
  try {
    const newList = await listsService.create(req.body, req.session.userId);
    res.status(201).json(newList);
  } catch (err) {
    console.error(`Error while creating the list:`, err.message);
    res.status(500).json({ error: err.message || "Failed to create list" });
  }
}

async function update(req, res) {
  try {
    const updated = await listsService.update(req.params.id, req.body, req.session.userId);
    if (!updated) {
      return res.status(404).json({ error: "List not found or not authorized" });
    }
    res.json(updated);
  } catch (err) {
    console.error(`Error while updating the list:`, err.message);
    res.status(500).json({ error: err.message || "Failed to update list" });
  }
}

async function remove(req, res) {
  try {
    const deleted = await listsService.remove(req.params.id, req.session.userId);
    if (!deleted) {
      return res.status(404).json({ error: "List not found or not authorized" });
    }
    res.json(deleted);
  } catch (err) {
    console.error(`Error while deleting the list:`, err.message);
    res.status(500).json({ error: err.message || "Failed to delete list" });
  }
}

export { getAll, get, create, update, remove };
