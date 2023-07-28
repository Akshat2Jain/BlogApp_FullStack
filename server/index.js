const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
//dotenv config
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());

// db config

const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

port = process.env.PORT;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`.bgGreen.black);
  });
});
