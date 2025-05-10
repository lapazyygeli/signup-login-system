import * as tasksService from "./tasks.service.js";

async function getAll(req, res) {
  try {
    const tasks = await tasksService.getAll(req.session.userId);
    res.json(tasks);
  } catch (err) {
    console.error(`Error while getting the tasks`, err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

async function getAllByList(req, res) {
  try {
    const tasks = await tasksService.getAllByList(
      req.session.userId,
      req.params.listId
    );
    res.json(tasks);
  } catch (err) {
    console.error(`Error while getting the tasks`, err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

async function get(req, res) {
  try {
    const task = await tasksService.get(req.params.id, req.session.userId);
    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }
    res.json(task);
  } catch (err) {
    console.error(`Error while getting the task`, err.message);
    res.status(500).json({ error: "Failed to fetch task" });
  }
}

async function create(req, res) {
  try {
    const task = await tasksService.create(req.body, req.session.userId);
    if (!task) {
      return res.status(400).json({ error: "Unauthorized or invalid list" });
    }
    res.status(201).json(task);
  } catch (err) {
    console.error(`Error while creating the task`, err.message);
    res.status(500).json({ error: "Failed to create task" });
  }
}

async function update(req, res) {
  try {
    const updated = await tasksService.update(
      req.params.id,
      req.body,
      req.session.userId
    );
    if (!updated) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }
    res.json(updated);
  } catch (err) {
    console.error(`Error while updating the task`, err.message);
    res.status(500).json({ error: "Failed to update task" });
  }
}

async function remove(req, res) {
  try {
    const removed = await tasksService.remove(
      req.params.id,
      req.session.userId
    );
    if (!removed) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }
    res.json(removed);
  } catch (err) {
    console.error(`Error while deleting the task`, err.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
}

export { getAll, getAllByList, get, create, update, remove };
