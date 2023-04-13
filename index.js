// mengimport library yang dibutuhkan
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
// mengimport router yang telah dibuat
const router = require("./routers");
//  memanggil config untuk dotenv
dotenv.config();

// membuat instance dari express
const app = express();
// app express menggunakan cors, express.json, morgan, express.urlencoded, dan router
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(router);

// membuat server yang berjalan pada port 3000
app.listen(process.env.PORT, () =>
  console.log("Server is running on port http://localhost:3000")
);
