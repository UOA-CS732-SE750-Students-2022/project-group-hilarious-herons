import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    foodName: String,
    bodyText: { type: String, required: true },
    tags: [{ type: String }], //Add at least 1 tag validation requirement
    dietryRequirements: [{ type: String }],
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    numberOfLikes: Number,
    // image : TODO : Figure out how to include image in schema
    rating: Number,
    numberOfReviews: Number,
  },
  {
    timestamp: {},
  }
);

const Post = mongoose.Schema("Post", postSchema);

export { Post };
