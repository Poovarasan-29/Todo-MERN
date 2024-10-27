const mongoose = require("mongoose");

const uri =
  "mongodb+srv://spking222005:SayHi_29@todoapp.r2s7x.mongodb.net/todo";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;
