import blogSvs from "../services/blogs";

export const NEW_BLOG = "NEW_BLOG";
export const LIKE = "LIKE";
export const INIT_BLOGS = "INIT_BLOGS";
export const DELETE_BLOG = "DELETE_BLOG";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data;
    case NEW_BLOG:
      return [...state, action.data];
    case LIKE:
      const id = action.data.id;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    case DELETE_BLOG:
      return state;
    default:
      return state;
  }
};

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogSvs.getAll();
  dispatch({ type: INIT_BLOGS, data: blogs });
};

export const createBlog = (content) => async (dispatch) => {
  const newBlog = await blogSvs.create(content);
  dispatch({ type: NEW_BLOG, data: newBlog });
};

export const likeBlog = (id, content) => async (dispatch) => {
  const updatedBlog = await blogSvs.update(id, content);
  dispatch({ type: LIKE, data: { ...updatedBlog, id: id } });
};

export const deleteBlog = (id, token) => async (dispatch) => {
  await blogSvs.deleteBlog(id, token);
  dispatch({ type: DELETE_BLOG });
};

export default blogReducer;
