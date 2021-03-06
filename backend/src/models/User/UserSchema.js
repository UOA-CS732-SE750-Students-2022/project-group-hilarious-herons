const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firebaseUUID: { type: String, required: true },
  displayName: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  favourites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followingUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
