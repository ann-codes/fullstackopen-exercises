import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = () => axios.get(baseUrl).then((res) => res.data);

const findByUsername = async (findUsername) => {
  const res = await axios.get(baseUrl);
  return res.data.find((info) => info.username === findUsername);
};

const findById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default { getAllUsers, findByUsername, findById };
