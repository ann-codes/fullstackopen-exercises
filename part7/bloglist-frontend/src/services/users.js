import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = () => axios.get(baseUrl).then((res) => res.data);

const findByUsername = async (findUsername) => {
  const res = await axios.get(baseUrl);
  return res.data.find((info) => info.username === findUsername);
};

const findById = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/${id}`);
    return res.data;
  } catch (ex) {
    console.error("USER NOT FOUND: ", ex);
    return 0;
  }
};

export default { getAllUsers, findByUsername, findById };
