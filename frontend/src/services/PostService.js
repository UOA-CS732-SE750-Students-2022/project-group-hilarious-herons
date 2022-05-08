import { apiGET } from "./api/apiAccessFunctions";

export const PostService = {
    getPosts
}

/**
 * Gets posts from the database.
 * @returns Posts objects from DB.
 */
async function getPosts (bodyJson = {
    "lat":-36.91042,
    "long":174.7698112,
    "range":20,
    "numberOfposts":2
})  {
    try {
      const result = await apiGET("/posts", bodyJson);
      return result;
    } catch (err) {
      if(err.response) {
        return err.response.status;
      }
    }
  };