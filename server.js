const express = require("express");
const app = express();
const ConnectiontoDB = require("./config/database.js");
const cors = require("cors");

require("dotenv").config();
ConnectiontoDB();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const studentRouter = require("./routes/studentRoutes");

app.use("/api/students", studentRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
