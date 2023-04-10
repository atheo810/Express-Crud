const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const router = require("./routers");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.PORT, () =>
  console.log("Server is running on port http://localhost:3000")
);
