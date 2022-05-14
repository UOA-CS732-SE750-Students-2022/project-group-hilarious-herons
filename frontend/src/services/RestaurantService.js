import { apiGET } from "./api/apiAccessFunctions";

export const RestaurantService = {
  getRestaurants,
};

async function getRestaurants(
  bodyJson = {
    name: "",
  }
) {
  try {
    const result = await apiGET("/restaurants", bodyJson);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response.status;
    }
  }
}
