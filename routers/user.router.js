// melakukan constrain destruktur dari express
const { Router } = require("express");
// memakai controller yang akan digunakan
const userController = require("../controllers/user.controller");
// membuat constraint untuk inisialisasi dari destruktrur Router() dari express
const router = Router();

// router yang di buat pada file ini ( :id adalah parameter yang akan di gunakan)
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// export router agar dapat digunakan pada file lain
module.exports = router;
