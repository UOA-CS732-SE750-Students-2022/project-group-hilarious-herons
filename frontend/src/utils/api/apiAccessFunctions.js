import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

/**
 * Makes a call to backend server to retrieve a resource
 * @param {*} endpoint - The API endpoint to be reached (i.e. /api/users/:id)
 * @param {*} data
 * @returns
 */
const apiGET = async (endpoint, data) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response.data;
};

/**
 * Makes a call to the backend server to create a resource
 * @param {*} endpoint - The API endpoint to be reached (i.e. /api/users/:id)
 * @param {*} data - A JSON object to be supplied in the request body
 * @returns
 */
const apiPOST = async (endpoint, data) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};

/**
 * Makes a call to the backend server to update a resource
 * @param {*} endpoint - The API endpoint to be reached (i.e. /api/users/:id)
 * @param {*} data - A JSON object to be supplied in the request body
 * @returns
 */
const apiPUT = async (endpoint, data) => {
  const response = await axios.put(`${BASE_URL}${endpoint}`);

  return response.data;
};

/**
 * Makes a call to the backend server to delete a resource
 * @param {*} endpoint - The API endpoint to be reached (i.e. /api/users/:id)
 * @param {*} data
 * @returns
 */
const apiDELETE = async (endpoint, data) => {
  const response = await axios.delete(`${BASE_URL}${endpoint}`);

  return response.data;
};

export { apiGET, apiPOST, apiPUT, apiDELETE };
