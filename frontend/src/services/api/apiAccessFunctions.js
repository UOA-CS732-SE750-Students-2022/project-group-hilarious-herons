import axios from "axios";
import { auth } from "../../utils/firebase";

const BASE_URL = "http://localhost:3001/api";

const checkTokenExpired = (message) => {
  if (message === "JWT has expired") {
    localStorage.removeItem("token");

    auth.currentUser
      .getIdToken()
      .then((token) => localStorage.setItem("token", token));

    window.location.reload();
  }
};

/**
 * Makes a call to backend server to retrieve a resource
 * @param {*} endpoint - The API endpoint to be reached (i.e. /api/users/:id)
 * @param {*} data
 * @returns
 */
const apiGET = async (endpoint, data = "") => {
  const headers = { Authorization: `${localStorage.getItem("token")}` };

  const response = await axios
    .get(`${BASE_URL}${endpoint}`, {
      params: data,
      headers: headers,
    })
    .catch((err) => {
      if (!err?.response) {
        throw new Error("Server Unavailable");
      }
      checkTokenExpired(err.response.data.message);
      throw new Error(`${err.response.data.message}`);
    });
  return response.data;
};

/**
 * Makes a call to the backend server to create a resource
 * @param {*} endpoint - The API endpoint to be reached (i.e. /api/users/:id)
 * @param {*} data - A JSON object to be supplied in the request body
 * @returns
 */
const apiPOST = async (endpoint, data) => {
  const headers = { Authorization: `${localStorage.getItem("token")}` };

  const response = await axios
    .post(`${BASE_URL}${endpoint}`, data, {
      headers: headers,
    })
    .catch((err) => {
      if (!err?.response) {
        throw new Error("Server Unavailable");
      }
      checkTokenExpired(err.response.data.message);
      throw new Error(`${err.response.data.message}`);
    });
  return response.data;
};

/**
 * Makes a call to the backend server to update a resource
 * @param {*} endpoint - The API endpoint to be reached (i.e. /api/users/:id)
 * @param {*} data - A JSON object to be supplied in the request body
 * @returns
 */
const apiPUT = async (endpoint, data) => {
  const headers = { Authorization: `${localStorage.getItem("token")}` };

  const response = await axios
    .put(`${BASE_URL}${endpoint}`, data, {
      headers: headers,
    })
    .catch((err) => {
      if (!err?.response) {
        throw new Error("Server Unavailable");
      }
      checkTokenExpired(err.response.data.message);
      throw new Error(`${err.response.data.message}`);
    });

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
