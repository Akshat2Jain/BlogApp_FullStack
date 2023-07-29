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
//  Post router
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
// Comment Router
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);
// Auth Router
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

port = process.env.PORT;

db.sequelize.sync().then(() => {
  app.listen(port || 8080, () => {
    console.log(`Server is running on ${port}`.bgGreen.black);
  });
});
