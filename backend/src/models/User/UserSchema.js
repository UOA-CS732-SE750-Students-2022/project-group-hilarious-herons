import mongoose from "mongoose";

/**
 * MongoDB Schema for a user object in the database
 */
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: (email) => {
      //Validates the email by checking if it follows either 'test@test.com' or 'test@test.co.nz' format
      return (
        /[a-zA-z]+@[a-zA-z]+\.[a-zA-z]+\.[a-zA-z]+/.test(email) ||
        /[a-zA-z]+@[a-zA-z]+\.[a-zA-z]+/.test(email)
      );
    },
  },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  favourites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followingUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

export { User };
