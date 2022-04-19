import axios from 'axios'

const BASE_URL = "http://localhost:3001/api/"

const apiGET = async (endpoint, data) => {
    const response = await axios.get(`${BASE_URL}${endpoint}`)

    return response.data
}

const apiPOST = async (endpoint, data) => {
    const response = await axios.post(`${BASE_URL}${endpoint}`)

    return response.data
}

const apiPUT = async (endpoint, data) => {
    const response = await axios.put(`${BASE_URL}${endpoint}`)

    return response.data

}

const apiDELETE = async (endpoint, data) => {
    const response = await axios.delete(`${BASE_URL}${endpoint}`)

    return response.data
}

export default {
    apiGET,
    apiPOST,
    apiPUT,
    apiDELETE
}