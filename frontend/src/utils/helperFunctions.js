import { apiGET, apiPOST, apiPUT, apiDELETE } from "./api/apiAccessFunctions";

/**
 * Gets the user associated with a firebase user stored in mongoDB
 * @param {*} firebaseUID - Firebase auth UID for user
 * @returns User object stored in MongoDB
 */
export const getUser = async (firebaseUID) => {
  try {
    const result = await apiGET("/users/firebase/" + firebaseUID);

    return result;
  } catch (err) {
    return err.response.status;
  }
};

/**
 * Creates and persists a new user in mongoDB
 * @param {*} newUser A User object following the UserSchema found in the backend project (backend/src/models/User)
 * @returns User object that has been created
 */
export const createUser = async (newUser) => {
  try {
    const result = await apiPOST("/users/", newUser);

    return result;
  } catch (err) {
    return err.response.status;
  }
};
