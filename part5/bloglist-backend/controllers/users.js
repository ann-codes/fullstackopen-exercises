const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { title: 1, url: 1 });
  res.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  const saltRounds = 10;

  if (!body.password || !body.username) {
    res.status(400).json({
      error: "username and password required",
    });
  }

  if (body.password.length < 3) {
    res.status(400).json({
      error: "password must be longer than 3 characters",
    });
  }

  if (body.username.length < 3) {
    res.status(400).json({
      error: "username must be longer than 3 characters",
    });
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
    res.status(201).end();
    console.log("USER CREATED");
  } catch (ex) {
    res.status(400).json({
      error: "EXCEPTION of " + ex,
    });
  }
});

module.exports = usersRouter;
