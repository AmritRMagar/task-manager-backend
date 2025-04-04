const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /users - Create new user
const createUser = async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const newUser = await prisma.user.create({
      data: { email, password },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'User creation failed', detail: err.message });
  }
};

// GET /users - Get all users
const getUsers = async (req, res) => {
  const users = await prisma.user.findMany({ include: { tasks: true } });
  res.json(users);
};

module.exports = { createUser, getUsers };
