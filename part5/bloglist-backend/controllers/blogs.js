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
    return res.status(401).json({ error: "title or url missing" });
  }

  if (req.body.title.trim().length < 3) {
    return res
      .status(401)
      .json({ error: "title must be 3 characters or greater" });
  }

  if (req.body.url.trim().length < 3) {
    return res
      .status(401)
      .json({ error: "url must be 5 characters or greater" });
  }

  // checks for ID if submitted
  const user = await User.findById(decodedToken.id);

  // checks against token spoofing
  if (!(user._id.toString() === req.body.userId)) {
    return res.status(400).json({ error: "user id and token mismatch" });
  }

  let addBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
  };

  // then save to mongo
  try {
    addBlog.user = user._id;
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
});

blogRouter.delete("/:id", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token invalid or missing" });
  }

  // checks for ID if submitted
  const user = await User.findById(decodedToken.id);
  const blogInfo = await Blog.findById(req.params.id);

  if (user.id.toString() === blogInfo.user.toString()) {
    try {
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).end();
      console.log("BLOG DELETED");
    } catch (ex) {
      res.status(400).json({ error: "bad request, error deleting" });
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
