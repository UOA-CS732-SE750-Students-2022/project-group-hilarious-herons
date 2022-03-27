import mongoose from "mongoose";

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: Number,
    long: Number,
  },
  googlePlaceId: { type: String, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export { Restaurant };
