const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const routes = require("./routes");
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_LINK,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Welcome to the application!");
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_CONNECTION_STRING}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });


app.listen(3001, () => {
  console.log("Server started on PORT 3001");
});
