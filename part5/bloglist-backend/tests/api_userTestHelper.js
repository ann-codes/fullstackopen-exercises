const User = require("../models/user");

const addUser0 = {
  name: "Cat",
  username: "coolkat",
  password: "coolkat",
};

const addUser1 = {
  name: "Cat",
  username: "coolcat",
  password: "coolcat",
};

const addUser2 = {
  name: "Dog",
  username: "A",
  password: "arff",
};

const addUser3 = {
  name: "Cat",
  username: "kitty",
  password: "ok",
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  addUser0,
  addUser1,
  addUser2,
  addUser3,
  usersInDb,
};
