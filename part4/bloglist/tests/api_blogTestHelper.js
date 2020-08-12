const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

const hashPass = async (pw) => {
  const passwordHash = await bcrypt.hash(pw, 10); 
  return passwordHash
}

const initBlogs = [
  {
    title: "Super Duper Cool Blog",
    author: "Ann",
    url: "coolBlog.com",
    likes: 44,
  },
  {
    title: "Something Blog",
    author: "Adam",
    url: "something.com",
    likes: 37,
  },
];

const addBlog1 = {
  title: "Meow Blog",
  author: "Zues",
  url: "cats.com",
  likes: 44,
};

const addBlog2 = {
  title: "Animal Crossing is the Best",
  author: "Tom Nook",
  url: "ACNH.com",
};

const addBlog3 = {
  author: "Failure",
  likes: 0,
};

const addUser1 = {
  name: "Cat",
  username: "coolcat",
  passwordHash: "123",
};

const addUser2 = {
  name: "Dog",
  username: "arff",
  password: "arff",
};

const addUser3 = {
  name: "Cat",
  password: "ok",
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initBlogs,
  addBlog1,
  addBlog2,
  addBlog3,
  addUser1,
  addUser2,
  addUser3,
  blogsInDb,
  usersInDb,
};
