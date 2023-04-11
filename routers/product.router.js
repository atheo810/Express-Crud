const { Router } = require("express");
const produkController = require("../controllers/produk.controller");
const router = Router();

router.get("/produk", produkController.getAllProducts);
router.get("/produk/:id", produkController.getProductById);
router.post("/produk", produkController.createProduct);
router.put("/produk/:id", produkController.updateProduct);
router.delete("/produk/:id", produkController.deleteProduct);

module.exports = router;
