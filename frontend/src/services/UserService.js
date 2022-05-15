import { processError } from "../utils/helper";
import { apiGET, apiPOST, apiPUT } from "./api/apiAccessFunctions";

export const userService = {
  getUser,
  createUser,
  updateUser,
};

/**
 * Gets the user associated with a firebase user stored in mongoDB
 * @param {*} firebaseUID - Firebase auth UID for user
 * @returns User object stored in MongoDB
 */
async function getUser(firebaseUID) {
  try {
    const result = await apiGET("/users/firebase/" + firebaseUID);
    return result;
  } catch (err) {
    return processError(err);
  }
}

/**
 * Creates and persists a new user in mongoDB
 * @param {*} newUser A User object following the UserSchema found in the backend project (backend/src/models/User)
 * @returns User object that has been created
 */
async function createUser(newUser) {
  try {
    const result = await apiPOST("/users/", newUser);

    return result;
  } catch (err) {
    return processError(err);
  }
}

/**
 * Updates an existing user in mongoDB
 * @param {*} firebaseUID Firebase auth UID for user.
 * @param updatedUser The updated User object following the UserSchema.
 */
async function updateUser(firebaseUID, updatedUser) {
  try {
    const result = await apiPUT("/users/" + firebaseUID, updatedUser);

    return result;
  } catch (err) {
    if (err.response) {
      return err.response.status;
    }
  }
}
