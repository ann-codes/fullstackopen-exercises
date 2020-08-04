const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((sum, likes) => sum + likes.likes, 0);

// could put below into reduce as well
const favoriteBlog = (blogs) =>
  blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );

const mostBlogs = (blogs) => {
  return {};
};

const mostLikes = (blogs) => {
  return {};
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
