const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const UserRoutes = require("./Routes/routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected successfully to DB and Listening on port 8001..!!!"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(UserRoutes);
