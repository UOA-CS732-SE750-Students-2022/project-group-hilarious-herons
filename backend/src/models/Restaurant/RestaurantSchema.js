const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: Number,
    long: Number,
  },
  googlePlaceId: { type: String, required: true },
  googleMapsURL: { type: String, required: true },
  openHours: [{ type: String }],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
