const { Router } = require("express");
const userRouter = require("../routers/user.router");
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.use(userRouter);

module.exports = router;
