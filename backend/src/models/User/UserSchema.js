import mongoose from "mongoose";

/**
 * MongoDB Schema for a user object in the database
 */
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  favourites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followingUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

export { User };
