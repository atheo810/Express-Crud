const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class userController {
  static async getAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = userController;
