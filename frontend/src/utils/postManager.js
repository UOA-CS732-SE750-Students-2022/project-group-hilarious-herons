import { PostService } from "../services/PostService";
import { userService } from "../services/UserService";
import { getTimestampFromId } from "./helper";

export const postDataForFoodCard = async (
  setIsNoSearchResults,
  keyword,
  bodyJson = {
    lat: -36.91042,
    long: 174.7698112,
    range: 20,
    numberOfposts: 2,
  }
) => {
  let result,
    dataToReturn = [];
  let user;

  if (keyword === "") {
    result = await PostService.getPosts(bodyJson);
    setIsNoSearchResults(false);
  } else {
    result = await PostService.searchPosts(keyword);

    if (!result) {
      // no search results
      setIsNoSearchResults(true);
      result = [];
    } else {
      setIsNoSearchResults(false);
    }
  }

  const uid = localStorage.getItem("uid");

  // Fetch the user if signed in
  if (uid !== null) {
    user = await userService.getUser(uid);
  }

  result.forEach((data, index) => {
    const liked = user ? user.favourites.indexOf(data._id) > -1 : false;
    let formattedDate = getTimestampFromId(data._id);
    let jsonForFoodCard = {
      id: data._id,
      foodName: data.foodName,
      image: data.imageURLs[0],
      numberOfLikes: data.numberOfLikes,
      rating: Math.round(data.rating),
      timestamp: formattedDate,
      postLiked: liked,
    };
    dataToReturn[index] = jsonForFoodCard;
  });
  return dataToReturn;
};