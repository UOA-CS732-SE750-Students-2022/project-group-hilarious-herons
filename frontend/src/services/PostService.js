import { apiGET, apiPOST } from "./api/apiAccessFunctions";

export const PostService = {
    getPosts,
    getPostDetails,
    searchPosts,
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
      processError(err);
    }
  };

async function getPostDetails(id) {
  try {
    const result = await apiGET("/posts/" + id);
    return result;
  } catch (err) {
    processError(err);
  }
}

async function searchPosts(keyword, bodyJson = {
  "lat":-36.91042,
  "long":174.7698112,
  "searchKeyWord": keyword,
}) {
  try {
    console.log(keyword);
    console.log(bodyJson);

    const result = await apiGET("/posts/search", bodyJson);
    console.log(result);
    return result;
  } catch (err) {
    processError(err);
  }
}

function processError(err) {
  console.log(err);
  if(err.response) {
    return err.response.status;
  }
}

