// Melakukan De Struckturisasi pada Router express
const { Router } = require("express");
// membuat constraint untuk router yang akan digunakan
const userRouter = require("../routers/user.router");
const produkRouter = require("../routers/product.router");
const loginRouter = require("../routers/login.router");
// membuat constrain router dan memanggil Router() di express
const router = Router();

// membuat halaman root folder (sebagai check jika telah terkoneksi)
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// memanggil router yang telah dibuat pada folder router ( selain index.js)
router.use(userRouter);
router.use(produkRouter);
router.use(loginRouter);

//export router agar dapat digunakan pada file lain
module.exports = router;
