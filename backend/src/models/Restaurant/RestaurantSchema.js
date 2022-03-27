import mongoose from "mongoose";
require("dotenv").config();

//Connecting to remote MongoDB
mongoose
  .connect(
    `mongodb+srv://db-user:${process.env.MONGO_PASSWORD}@cluster0.vprvj.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then((result) => {
    console.log("MongoDB connection successful");
  })
  .catch((error) => {
    console.log("MongoDB connection failed : ", error.message);
  });

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
