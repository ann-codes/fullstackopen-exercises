const Blog = require("../models/blog");

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
  _id: "5a422a851b54a676234d17f7",
  __v: 0,
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
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initBlogs,
  addBlog1,
  addBlog2,
  addBlog3,
  blogsInDb,
};
