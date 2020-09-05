import blogSvs from "../services/blogs";

export const FIND_BLOG_BY_ID = "FIND_BLOG_BY_ID";

const findBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case FIND_BLOG_BY_ID:
      return action.data;
    default:
      return state;
  }
};

export const findOneBlogById = (id) => async (dispatch) => {
  const blog = await blogSvs.findById(id);
  dispatch({ type: FIND_BLOG_BY_ID, data: blog });
};

export default findBlogReducer;
