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

const postSchema = new Schema(
  {
    foodName: String,
    bodyText: { type: String, required: true },
    tags: [{ type: String, required: true }], //Add at least 1 tag validation requirement
    dietryRequirements: [{ type: String }],
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    numberOfLikes: Number,
    rating: Number,
    numberOfReviews: Number,
    imageURLs: [{ type: String }],
  },
  {
    timestamp: {},
  }
);

const Post = mongoose.Schema("Post", postSchema, "Posts");

export { Post };
