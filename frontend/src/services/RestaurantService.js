import { apiGET } from "./api/apiAccessFunctions";

export const RestaurantService = {
    getRestaurants,
}

async function getRestaurants(name) {
    try {
      const result = await apiGET("/restaurants", {name: name} );
      return result;
    } catch (err) {
      processError(err);
    }
  }



