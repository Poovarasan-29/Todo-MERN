const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDatabase");
const createRouter = require("./routes/createRoute");

connectDB();
const app = express();
// const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(createRouter);

// app.listen(PORT, () => {
//   console.log("Server is running at PORT : ", PORT);
// });
