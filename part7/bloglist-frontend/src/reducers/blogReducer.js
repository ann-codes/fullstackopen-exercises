import blogSvs from "../services/blogs";

export const NEW_BLOG = "NEW_BLOG";
export const VOTE = "VOTE";
export const INIT_BLOGS = "INIT_BLOGS";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data;
    case NEW_BLOG:
      return [...state, action.data];
    case VOTE:
      return action.data; /// EDIT ME ====================
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

export const voteBlog = (id, content) => async (dispatch) => {};

export default blogReducer;
