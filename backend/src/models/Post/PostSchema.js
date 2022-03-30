const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    foodName: String,
    bodyText: { type: String, required: true },
    tags: [{ type: String, required: true }],
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

module.exports = mongoose.model("Post", postSchema, "Posts");

