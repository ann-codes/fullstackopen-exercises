const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((sum, likes) => sum + likes.likes, 0);

// reduce version
const favoriteBlog = (blogs) =>
  blogs.reduce((most, current) =>
    current.likes > most.likes ? current : most
  );

// non reduce version
const favoriteBlogMax = (blogs) =>
  blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );

// this could be better?
const mostBlogs = (blogs) => {
  const counts = blogs.reduce((names, current) => {
    names[current.author] = (names[current.author] || 0) + 1;
    return names;
  }, {});

  let highest = 0;
  let hAuthor = "";
  for (const [author, count] of Object.entries(counts)) {
    if (count > highest) {
      highest = count;
      hAuthor = author;
    }
  }
  return { author: hAuthor, blogs: highest };
};

const mostLikes = (blogs) => {
  const counts = blogs.reduce((names, current) => {
    names[current.author] = (names[current.author] || 0) + current.likes;
    return names;
  }, {});
  let highest = 0;
  let hAuthor = "";
  for (const [author, count] of Object.entries(counts)) {
    if (count > highest) {
      highest = count;
      hAuthor = author;
    }
  }
  return { author: hAuthor, likes: highest };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
