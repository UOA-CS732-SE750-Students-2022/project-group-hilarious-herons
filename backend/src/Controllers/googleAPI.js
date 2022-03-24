const axios = require("axios");

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

exports.getNearbyRestaurant = async (req, res) => {
  const { lat, long } = req.body;

  try {
    const response = await getNearbyPlace(lat, long);
    res.send(response);
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};

exports.hello = (req, res) => {
  res.send("hello");
};
