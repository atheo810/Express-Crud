//  melakukan Destruktur dari express
const { Router } = require("express");
// memanggil controller yang akan digunakan
const produkController = require("../controllers/produk.controller");
// membuat contraint untuk inisialisasi dari destruktrur Router() dari express
const router = Router();

// router yang di buat pada file ini ( :id adalah parameter yang akan di gunakan)
router.get("/produk", produkController.getAllProducts);
router.get("/produk/:id", produkController.getProductById);
router.post("/produk", produkController.createProduct);
router.put("/produk/:id", produkController.updateProduct);
router.delete("/produk/:id", produkController.deleteProduct);

// export router agar dapat digunakan pada file lain
module.exports = router;
