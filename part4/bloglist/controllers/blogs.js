const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token invalid or missing" });
  }

  if (!req.body.title || !req.body.url) {
    return res.status(400).json({ error: "title or url missing" });
  }

  let addBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
  };

  // checks for ID if submitted
  const user = await User.findById(decodedToken.id);

  // checks against token spoofing
  // if exists and matches the submitted userId then add the user.id object
  if (user._id.toString() === req.body.userId) {
    addBlog.user = user._id;
    // then save to mongo
    try {
      const blog = new Blog(addBlog);
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      res.json(savedBlog);
      res.status(201).end();
      console.log("BLOG CREATED");
    } catch (ex) {
      res.status(400).json({ error: "400 ERROR CREATING BLOG: " + ex });
    }
  } else {
    res.status(400).json({ error: "user id and token mismatch" });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token invalid or missing" });
  }

  // checks for ID if submitted
  const user = await User.findById(decodedToken.id);
  if (user) {
    try {
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).end();
      console.log("BLOG DELETED");
    } catch (ex) {
      res.status(400).end();
      console.log("400 ERROR DELETING, BAD REQUEST");
    }
  } else {
    res.status(400).json({ error: "user id and token mismatch" });
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
    console.log("BLOG UPDATED");
  } catch (ex) {
    res.status(400).end();
    console.log("400 ERROR UPDATING BLOG, BAD REQUEST");
  }
});

module.exports = blogRouter;
