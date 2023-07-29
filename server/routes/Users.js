const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

// register
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (user) {
    res.json({ message: "User already created", success: false });
  } else if (!user) {
    const hash = await bcrypt.hash(password, 10);
    Users.create({
      username: username,
      password: hash,
    });
    res.json({ message: "Registered Successfully", success: true });
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ message: "User Doen't exist", success: false });
  } else if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      res.json({ message: "Wrong Username or Password", success: false });
    else {
      const accessToken = sign(
        { username: user.username, id: user.id },
        "secretToken"
      );
      res.json({
        message: "Login Succesfully",
        success: true,
        accessToken,
        username: username,
      });
    }
  }
});

// route that tells the information of the user
router.get("/getUserInfo", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
