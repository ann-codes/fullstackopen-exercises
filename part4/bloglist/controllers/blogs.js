const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

// copied from readings
const getTokenFrom = (request) => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const addBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  const user = await User.findById(decodedToken.id);

  // const user = await User.findById(req.body.userId);

  // { // submit obj like below
  //   "likes": 2,
  //   "title": "Some Title",
  //   "author": "Ann",
  //   "url": "ann.com",
  //   "userId": "5f2e2a7e3fabbe0dbb386909"
  // }

  if (user) {
    addBlog[user] = user._id;
  }

  const blog = new Blog(addBlog);
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.json(savedBlog);
    res.status(201).end();
    console.log("ENTRY CREATED");
  } catch (ex) {
    res.status(400).end();
    console.log("400 ERROR BAD REQUEST");
  }
});

blogRouter.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
    console.log("ENTRY DELETED");
  } catch (ex) {
    res.status(400).end();
    console.log("400 ERROR DELETING, BAD REQUEST");
  }
});

blogRouter.put("/:id", async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };
  try {
    await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    res.json(blog);
    res.status(200).end();
    console.log("ENTRY UPDATED");
  } catch (ex) {
    res.status(400).end();
    console.log("400 ERROR UPDATING, BAD REQUEST");
  }
});

module.exports = blogRouter;
