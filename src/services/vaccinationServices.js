import axios from "axios";

/*
  Handle new vaccination API calls
*/

const baseURL = "/api/vaccinations";

const registration = async (registrationDetails) => {
  const response = await axios.post(baseURL, registrationDetails);
  return response.data;
};

export default { registration };
