const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();
app.listen(process.env.PORT, () =>
  console.log("Server is running on port http://localhost:3000")
);
