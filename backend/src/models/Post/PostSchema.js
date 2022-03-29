import mongoose from "mongoose";
require("dotenv").config();

//Connecting to remote MongoDB

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
