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
