import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (id, updatedBlog) => {
  const req = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return req.data;
};

export default { setToken, getAll, create, update };
