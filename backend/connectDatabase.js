const mongoose = require("mongoose");

const uri = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;
