// melakukan constraint dan destructuring dari @prisma/client
const { PrismaClient } = require("@prisma/client");
// melakukan constrain schema yang membutuhkan validator
const schema = require("../validator/validator");
// melakukan constraint bcrypt untuk enkripsi password
const bcrypt = require("bcrypt");
// membuat instance untuk prisma client
const prisma = new PrismaClient();

// membuat class untuk userController
class userController {
  // membuat static asyncronous function untuk mengambil semua data user
  static async getAllUsers(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const checklistjoi = schema.validateAsync(req.body);
      const result = await prisma.User.findMany({});
      // check apakah data ada atau tidak
      if (!result) {
        res.status(200).json({ error: "Tidak ada data saat ini" });
      }
      // mengirim respon kepada user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim respon kepada user dengan 500 dan hasil dari error yang sudah di tangkap
      res
        .status(500)
        .json({ error: `${error.message} tidak ada data saat ini` });
    }
  }
  // membuat static asyncronous function untuk mengambil data user berdasarkan id
  static async createUser(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      // melakukan validasi data menggunakan joi
      const checklistjoi = await schema.validateAsync(req.body);
      // melakukan enkripsi password menggunakan bcrypt
      const salt = await bcrypt.genSalt(10);
      // melakukan create data user
      const result = await prisma.User.create({
        data: {
          name: checklistjoi.name,
          email: checklistjoi.email,
          password: bcrypt.hashSync(checklistjoi.password, salt),
        },
      });
      // check apakah data berhasil dibuat atau tidak
      if (!result) {
        res.status(400).json({ error: "User tidak dapat dibuat" });
      }
      // mengirim respon kepada user dengan 201 dan hasil dari result yang sudah diambil dari database
      res.status(201).json(result);
    } catch (error) {
      // mengirim respon kepada user dengan 500 dan hasil dari error yang sudah di tangkap
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk mengambil data user berdasarkan id
  static async getUserById(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      // melakukan prisma findUnique untuk mengambil data user berdasarkan id
      const result = await prisma.User.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      // mengirimkan status 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim respon kepada user dengan 500 dan hasil dari error yang sudah di tangkap
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk mengupdate data user berdasarkan id
  static async updateUser(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      // melakukan validasi data menggunakan joi
      const checklistjoi = await schema.validateAsync(req.body);
      // melakukan enkripsi password menggunakan bcrypt
      const salt = await bcrypt.genSalt(10);
      // melakukan update data user berdasarkan id
      const result = await prisma.User.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: checklistjoi.name,
          email: checklistjoi.email,
          password: bcrypt.hashSync(checklistjoi.password, salt),
        },
      });
      // check apakah data berhasil diupdate atau tidak
      if (!result) {
        res
          .status(404)
          .json({ error: "User tidak ditemukan dan tidak dapat dibuat" });
      }
      // mengirim respon kepada user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim respon kepada user dengan 500 dan hasil dari error yang sudah di tangkap
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk menghapus data user berdasarkan id
  static async deleteUser(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      // melakukan prisma delete untuk menghapus data user berdasarkan id
      const result = await prisma.User.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      // mengirim resopon status 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim respon kepada user dengan 500 dan hasil dari error yang sudah di tangkap
      res.status(500).json({ error: error.message });
    }
  }
}
// mengexport class userController
module.exports = userController;
