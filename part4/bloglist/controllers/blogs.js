const blogRouter = require("express").Router();
const Blog = require("../models/blog");

// blogRouter.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// changing to async/await
blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
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
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  });
  try {
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (ex) {
    res.status(400).end();
    console.log("ERROR BAD REQUEST ===>", ex);
  }
});

module.exports = blogRouter;
