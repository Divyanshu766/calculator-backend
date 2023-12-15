const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://lalitarawat90123:ml05a09d@cluster0.vcg1h01.mongodb.net/calculator"
);

module.exports = { connection };
