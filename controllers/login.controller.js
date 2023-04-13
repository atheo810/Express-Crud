const bcrypt = require("bcrypt");
const httperror = require("http-errors");
const { PrismaClient } = require("@prisma/client");
const { error } = require("../validator/produk.validator");
const { response } = require("express");
const { func } = require("joi");
const prisma = new PrismaClient();

class loginController {
  static async loginaccess(req, response) {
    try {
      const result = await prisma.User.findMany({
        where: {
          name: req.body.name,
        },
      });
      if (!result) {
        response.status(404).json({ error: "User tidak ditemukan" });
      }
      const checkbcrypt = await bcrypt.compare(
        req.body.password,
        result[0].password
      );
      console.log(checkbcrypt);
      if (!checkbcrypt) {
        next(response.status(400).json({ error: "Password salah" }));
      }
      return response.status(200).json({ message: "Login berhasil" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = loginController;
