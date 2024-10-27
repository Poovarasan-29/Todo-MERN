const mongoose = require("mongoose");

// const uri = "mongodb://localhost:27017/crud";

const uri =
  "mongodb+srv://spking222005:SayHi_29@todoapp.r2s7x.mongodb.net/todo";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB can't connected : ", error);
  }
};
module.exports = connectDB;
