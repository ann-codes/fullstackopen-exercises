import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = () =>
  axios.get(baseUrl).then((res) => {
    return res.data;
  });

const findByUsername = async (findUsername) => {
  const res = await axios.get(baseUrl);
  return res.data.find((info) => info.username === findUsername);
};

export default { getAllUsers, findByUsername };
