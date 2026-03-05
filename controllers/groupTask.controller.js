import Task from '../models/Task.js';

const createGroupTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id,
    group: req.group._id,
  });

  res.status(201).json({ message: 'Task created', task });
};

const getGroupTasks = async (req, res) => {
  const tasks = await Task.find({
    group: req.group._id,
  });

  res.json({ total: tasks.length, tasks });
};

const getGroupTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json(task);
};

const editGroupTask = async (req, res) => {
  const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
  if (!tasks) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json({ message: 'Task updated', tasks });
};

const deleteGroupTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json({ message: 'Task deleted' });
};

export { createGroupTask, getGroupTasks, getGroupTaskById, editGroupTask, deleteGroupTask };
