const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /tasks
const getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({ include: { user: true } });
  res.json(tasks);
};

// POST /tasks
const createTask = async (req, res) => {
  const { title, userId } = req.body;
  const task = await prisma.task.create({
    data: { title, userId },
  });
  res.status(201).json(task);
};

// PUT /tasks/:id
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { title, completed },
  });
  res.json(task);
};

// DELETE /tasks/:id
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Task deleted' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
