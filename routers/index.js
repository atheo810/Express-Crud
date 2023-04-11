const { Router } = require("express");
const userRouter = require("../routers/user.router");
const produkRouter = require("../routers/product.router");
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.use(userRouter);
router.use(produkRouter);

module.exports = router;
