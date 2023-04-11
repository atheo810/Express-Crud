const joi = require("joi");
const schema = joi.object({
  nama: joi.string(),
  harga: joi.number(),
  qty: joi.number(),
});

module.exports = schema;
