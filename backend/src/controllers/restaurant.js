const { createRestaurant } = require("../models/Restaurant/restaurant-dao");
const Restaurant = require("../models/Restaurant/RestaurantSchema");
const {
  getRestaurantByText,
  getPlace,
} = require("../utils/googleApi/googleAPI");

/**
 * Get restaurant detail that matcehs the give id
 * @param {*} req
 * @param {*} res 200 sucess, 404 not found 500 internal error
 * @returns
 */
exports.getRestaurantDetail = async (req, res) => {
  try {
    const { name } = req.query;

    let resDetail = await Restaurant.find({ name: { $regex: `(?i)^${name}` } });

    if (resDetail.length === 0) {
      const response = await getRestaurantByText(name);

      for (data of response.results) {
        const result = await getPlace(data.place_id);
        const place = result.result;
        const location = place.geometry.location;

        const openHours =
          place.opening_hours === undefined
            ? null
            : place.opening_hours.weekday_text;

        let restaurantObj = {
          name: place.name,
          address: place.vicinity,
          coordinates: { lat: location.lat, long: location.lng },
          googlePlaceId: place.place_id,
          googleMapsURL: place.url,
          openHours: openHours,
        };
        const restuarntName = await Restaurant.findOne({ name: place.name });
        if (restuarntName === null) {
          restaurantObj = await createRestaurant(restaurantObj);
        }

        resDetail = [...resDetail, restaurantObj];
      }

      if (resDetail.length === 0) {
        return res
          .status(404)
          .json({ success: false, info: "No such restuarant" });
      }
    }
    res.send(resDetail);
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};
