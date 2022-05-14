import { apiGET, apiPOST } from "./api/apiAccessFunctions";
import { processError } from "../utils/helper";
export const PostService = {
  getPosts,
  getPostDetails,
  likePost,
  unlikePost,
  searchPosts,
  addPost,
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
    processError(err);
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
    processError(err);
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
      processError(err);
    }
  }
}

async function getPostDetails(id) {
  try {
    const lat = localStorage.getItem("lat");
    const long = localStorage.getItem("long");
    let bodyJson;
    if (lat === null || long === null) {
      bodyJson = {
        lat: lat,
        long: long,
      };
    } else {
      bodyJson = {
        lat: -36.91042,
        long: 174.7698112,
      };
    }

    const result = await apiGET("/posts/" + id, bodyJson);
    return result;
  } catch (err) {
    processError(err);
  }
}

async function searchPosts(
  keyword,
  bodyJson = {
    lat: -36.91042,
    long: 174.7698112,
    searchKeyWord: keyword,
  }
) {
  try {
    const result = await apiGET("/posts/search", bodyJson);
    return result;
  } catch (err) {
    processError(err);
  }
}

async function addPost(postJSON, image) {
  try {
    //upload the image
    const imageData = new FormData();
    imageData.append("file", image);
    const res = await apiPOST("/posts/image", imageData);

    //add new post
    postJSON = {
      ...postJSON,
      imageURLs: [res],
      userId: localStorage.getItem("uid"),
    };

    const result = await apiPOST("/posts/", postJSON);

    return result;
  } catch (err) {
    console.log(err);

    if (err.response) {
      return err.response;
    }
  }
}
