const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "todo",
    },
  ],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
