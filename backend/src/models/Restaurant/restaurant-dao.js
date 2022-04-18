const Restaurant = require("./RestaurantSchema");

/**
 * Saves a restaurant to the database
 * @param {*} restaurant The restaurant object to be saved
 * @returns Restaurant object created from mongoose schema
 */
exports.createRestaurant = async (restaurant) => {
  const newRestaurant = new Restaurant(restaurant);
  await newRestaurant.save();

  return newRestaurant;
};

/**
 * Retrieves the restaurant from the database with the specifiedID
 * @param {*} restaurantID UUID for the restaurant to be retrieved
 * @returns Object with given restaurantID if it can be found
 */
exports.retrieveRestaurant = async (restaurantID) => {
  return await Restaurant.findById(restaurantID);
};

/**
 * Updates an existing restaurant in the database with new data from supplied object
 * @param {*} restaurant A restaurant object data to update object
 * @returns True if object is found and update, false otherwise
 */
exports.updateRestaurant = async (restaurant) => {
  const existingRestaurant = await Restaurant.findById(restaurant._id);

  if (existingRestaurant) {
    existingRestaurant.name = restaurant.name;
    existingRestaurant.address = restaurant.address;
    existingRestaurant.coordinates = restaurant.coordinates;

    await existingRestaurant.save();
    return true;
  }

  return false;
};

/**
 * Deletes the restaurant from the database, if it exists.
 * @param {*} restaurant The ID for the restaurant to be deleted
 * @returns
 */
exports.deleteRestaurant = async (restaurantID) => {
  return await Restaurant.deleteOne({ id: restaurantID });
};
