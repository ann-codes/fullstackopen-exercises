const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// blogRouter.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// changing to async/await
blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

// blogRouter.post("/", (request, response) => {
//   const blog = new Blog(request.body);
//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

// changing to async/await
blogRouter.post("/", async (req, res) => {
  const user = await User.findById(req.body.userId);
  // { // submit obj like below
  //   "likes": 2,
  //   "title": "Some Title",
  //   "author": "Ann",
  //   "url": "ann.com",
  //   "userId": "5f2e2a7e3fabbe0dbb386909"
  // }
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.json(savedBlog);
    res.status(201).end();
    console.log("ENTRY SAVED");
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
