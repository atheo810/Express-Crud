// melakukan destructuring dari prisma client
const { PrismaClient } = require("@prisma/client");
//  memanggil validator untuk validasi data menggunakan joi
const schema = require("../validator/produk.validator");
// membuat instance untuk prisma client
const prisma = new PrismaClient();

// membuat class untuk Produkcontroller
class produkController {
  // membuat static asyncronous function untuk mengambil semua data produk
  static async getAllProducts(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const result = await prisma.Produk.findMany({});
      // check apakah data ada atau tidak
      if (!result) {
        res.status(400).json({ error: "Tidak ada data saat ini" });
      }
      // mengirim respon kepada user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim respon kepada user dengan 500 dan hasil dari error yang sudah di tangkap
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk mengambil data produk berdasarkan id
  static async getProductById(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const result = await prisma.Produk.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      // mengirim data ke user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim data ke user dengan 400 dan menampilkan pesan error
      res.status(400).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk membuat data produk
  static async createProduct(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const result = await prisma.Produk.create({
        data: { ...checklistjoi },
      });
      res.status(201).json(result);
    } catch (error) {
      // mengirim data ke user dengan 500 dan menampilkan pesan error
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk mengupdate data produk
  static async updateProduct(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const result = await prisma.Produk.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          nama: checklistjoi.nama,
          harga: checklistjoi.harga,
          qty: checklistjoi.qty,
        },
      });
      // mengirim data ke user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim data ke user dengan 500 dan menampilkan pesan error
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk menghapus data produk
  static async deleteProduct(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const result = await prisma.Produk.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      // mengirim data ke user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim data ke user dengan 500 dan menampilkan pesan error
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = produkController;
