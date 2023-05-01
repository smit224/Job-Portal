const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const UserRoutes = require("./Routes/routes");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://smit_224:Smittrambadia1@mernstack.lmseuhi.mongodb.net/?retryWrites=true&w=majority";


const app = express();
app.use(express.json());
app.use(cookieParser());
var path = require("path");
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:5173",
    origin: "https://644f150001e738318e520fc3--polite-praline-ba5f18.netlify.app"
  })
);

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

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
    console.log("Error while connecting to the DB",err);
  });

app.use(UserRoutes);
