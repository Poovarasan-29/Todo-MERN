const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await UserModel.findOne({ email });
  if (isUserExists)
    return res.status(409).json({ message: "User Already Exists" });
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashPassword,
      todos: [],
    });
    await user.save();

    return res.status(201).json({ message: "User Created", userId: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Server Error Retry!" });
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found. Please Register" });
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res.status(401).json({ message: "Wrong Password" });
    return res.status(200).json({ userId: user._id, message: "Login Success" });
  } catch (error) {
    return res.status(404).json({ message: "Something error Retry!" });
  }
};
