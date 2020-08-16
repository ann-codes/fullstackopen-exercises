import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// const getAllAA = async () => {
//   const req = await axios.get(baseUrl);
//   return req.data;
// };

export default { getAll };
