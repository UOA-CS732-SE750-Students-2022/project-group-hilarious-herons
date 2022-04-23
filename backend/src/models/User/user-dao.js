const User = require("./UserSchema");

/**
 * Saves a user to the database
 * @param {*} user The user object to be saved
 * @returns User object created from mongoose schema
 */
exports.createUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();

  return newUser;
};

/**
 * Retrieves the user from the database with the specified ID
 * @param {*} userID UUID for the restaurant to be retrieved (This is MONGODB ID)
 * @returns Object with given userID if it can be found
 */
exports.retrieveUser = async (userID) => {
  return await User.findById(userID);
};

/**
 * Retrieves the user from the databse with the specified firebaseUUID
 * @param {*} firebaseUID UUID for user in firebase auth
 * @returns Object with given userID if it can be found
 */
exports.retrieveByFirebaseUID = async (firebaseUID) => {
  return await User.findOne({ firebaseUUID: firebaseUID });
};

/**
 * Updates an existing user in the database with new data from supplied object
 * @param {*} user A user object data to update object
 * @returns True if object is found and update, false otherwise
 */
exports.updateUser = async (user) => {
  const existingUser = await User.findById(user._id);

  if (existingUser) {
    existingUser.displayName = user.displayName;
    existingUser.firstName = user.firstName;
    existingUser.lastName = user.lastName;
    existingUser.posts = user.posts;
    existingUser.favourites = user.favourites;
    existingUser.followingUsers = user.followingUsers;

    await existingUser.save();
    return true;
  }

  return false;
};

/**
 * Deletes the user from the database, if it exists.
 * @param {*} user The ID for the restaurant to be deleted
 * @returns
 */
exports.deleteUser = async (userID) => {
  return await User.deleteOne({ id: userID });
};
