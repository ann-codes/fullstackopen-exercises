const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { title: 1, url: 1 });
  // not required but wanted to include as example of join-like DS
  res.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
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
    console.log("EXCEPTIOÑ=======", ex);
    res.status(400).json({
      error:
        "username and password required; password must be longer than 3 characters",
    });
  }
});

module.exports = usersRouter;
