const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./connectDatabase");
const todoRouter = require("./routes/todoRouter");
const userRouter = require("./routes/userRouter");

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(todoRouter);
app.use(userRouter);
app.get("/", (req, res) => {
  res.send("Server running...");
});

app.listen(PORT, () => {
  console.log("Server is running at PORT : ", PORT);
});
