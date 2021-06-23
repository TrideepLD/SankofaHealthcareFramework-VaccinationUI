import axios from "axios";

/*
  Handle Login API calls
*/

const baseURL = "/api/login";

//Login API call
const login = async (username, password) => {
  const response = await axios.post(baseURL, { username, password });
  return response.data;
};

export default { login };
