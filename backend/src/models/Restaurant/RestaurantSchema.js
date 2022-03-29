import mongoose from "mongoose";
require("dotenv").config();

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
});

const Restaurant = mongoose.model(
  "Restaurant",
  restaurantSchema,
  "Restaurants"
);

export { Restaurant };
