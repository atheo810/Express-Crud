const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/produk.validator");
const prisma = new PrismaClient();

class produkController {
  static async getAllProducts(req, res) {
    try {
      const result = await prisma.Produk.findMany({});
      if (!result) {
        res.status(400).json({ error: "Tidak ada data saat ini" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getProductById(req, res) {
    try {
      const result = await prisma.Produk.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async createProduct(req, res) {
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const result = await prisma.Produk.create({
        data: { ...checklistjoi },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async updateProduct(req, res) {
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
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async deleteProduct(req, res) {
    try {
      const result = await prisma.Produk.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = produkController;
