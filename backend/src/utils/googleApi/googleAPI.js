const axios = require("axios");

/**
 * return a list of nearby restaurant which rank by restaurant
 * @param {*} lat
 * @param {*} long
 * @returns
 */
const getNearbyPlace = async (lat, long) => {
  const key = process.env.GOOGLE_API_KEY;

  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&rankby=distance&type=restaurant&key=${key}`,
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
const getReivewfromGoogle = async (lat, long) => {
  try {
    const response = await getNearbyPlace(lat, long);
    const placeDetails = response.results.map(async (res) => {
      const detail = await getRestaurant(res.place_id);

      return detail.result;
    });
    // const placeResponse = await getRestaurant("ChIJST6enOVHDW0RG9tjM7E9zDg");

    const result = await Promise.all(placeDetails);

    return result;
  } catch (e) {
    throw e;
  }
};

exports.getNearbyPlace = getNearbyPlace;
exports.getReivewfromGoogle = getReivewfromGoogle;
