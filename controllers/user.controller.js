const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class userController {
  static async getAllUsers(req, res) {
    try {
      const result = await prisma.User.findMany({});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async createUser(req, res) {
    try {
      const result = await prisma.User.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getUserById(req, res) {
    try {
      const result = await prisma.User.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async updateUser(req, res) {
    try {
      const result = await prisma.User.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async deleteUser(req, res) {
    try {
      const result = await prisma.User.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = userController;
