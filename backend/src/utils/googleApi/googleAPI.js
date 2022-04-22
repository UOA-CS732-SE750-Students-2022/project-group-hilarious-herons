const axios = require("axios");

/**
 * return a list of nearby restaurant which rank by restaurant
 * @param {*} lat
 * @param {*} long
 * @returns
 */
const getNearbyPlace = async (lat, long, range) => {
  const key = process.env.GOOGLE_API_KEY;
  if (typeof range === "undefined" || range === null) {
    range = 10000;
  }
  console.log(range);

  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&type=restaurant&radius=${range}&key=${key}`,
    headers: {},
  };

  const response = await axios(config).catch(function (error) {
    console.log(error);
    throw error;
  });

  return response.data;
};

/**
 *
 * @param {*} placeId
 * @returns place detail
 */
const getRestaurant = async (placeId) => {
  const key = process.env.GOOGLE_API_KEY;

  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`,
    headers: {},
  };

  const response = await axios(config).catch(function (error) {
    console.log(error);
    throw error;
  });

  return response.data;
};

/**
 * return neaby restaurnt information including reviews and photo
 * https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses
 */
const getReivewfromGoogle = async (lat, long, range) => {
  try {
    const response = await getNearbyPlace(lat, long, range);

    const placeDetails = response.results.map(async (res) => {
      const detail = await getRestaurant(res.place_id);
      return detail.result;
    });

    const result = await Promise.all(placeDetails);

    return result;
  } catch (e) {
    throw e;
  }
};

const getRestaurantByText = async (name) => {
  try {
    const key = process.env.GOOGLE_API_KEY;

    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&key=${key}`,
      headers: {},
    };

    const response = await axios(config).catch(function (error) {
      console.log(error);
      throw error;
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

const getGooglePhoto = async (ref) => {
  const key = process.env.GOOGLE_API_KEY;
  try {
    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${key}`,
      headers: {},
    };

    const response = await axios(config).catch(function (error) {
      console.log(error);
      throw error;
    });
    return response.request.res.responseUrl;
  } catch (e) {
    throw e;
  }
};

exports.getPlace = getRestaurant;
exports.getNearbyPlace = getNearbyPlace;
exports.getReivewfromGoogle = getReivewfromGoogle;
exports.getRestaurantByText = getRestaurantByText;
exports.getGooglePhoto = getGooglePhoto;
