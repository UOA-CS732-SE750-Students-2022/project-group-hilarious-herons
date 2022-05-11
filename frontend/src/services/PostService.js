import { apiGET, apiPOST } from "./api/apiAccessFunctions";

export const PostService = {
  getPosts,
  getPostDetails,
  likePost,
  unlikePost,
};

/**
 * Gets posts from the database.
 * @returns Posts objects from DB.
 */
async function getPosts(
  bodyJson = {
    lat: -36.91042,
    long: 174.7698112,
    range: 20,
    numberOfposts: 2,
  }
) {
  try {
    const result = await apiGET("/posts", bodyJson);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response.status;
    }
  }
}

/**
 * Update the given post with a new like.
 * @param id The id of the post.
 * @returns The updated status of the post.
 */
async function likePost(id) {
  const bodyJson = { id: id };
  try {
    const result = await apiPOST("/posts/like-post", bodyJson);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response.status;
    }
  }
}

/**
 * Update the given post with a new like.
 * @param id The id of the post.
 * @returns The updated status of the post.
 */
async function unlikePost(id) {
  const bodyJson = { id: id };
  try {
    const result = await apiPOST("/posts/unlike-post", bodyJson);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response.status;
    }
  }
}

async function getPostDetails(id) {
  try {
    const result = await apiGET("/posts/" + id);
    return result;
  } catch (err) {
    if (err.response) {
      return err.response.status;
    }
  }
}
