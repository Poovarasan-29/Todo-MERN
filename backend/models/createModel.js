const mongoose = require("mongoose");

const createSchema = mongoose.Schema({
  title: String,
  description: String,
});

const createModel = mongoose.model("to-do", createSchema);
module.exports = createModel;
