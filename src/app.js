const express = require("express");
require("dotenv").config();
const { DBconnect } = require("../config/DBconnection");
const authRouter = require("../routes/auth");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);

DBconnect()
  .then(() => {
    console.log("Database connected successfully!!!");
    app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
  })
  .catch((err) => {
    console.log("Error occured while connecting with database");
  });
