import { PostService } from "../services/PostService";
import { userService } from "../services/UserService";
import { getTimestampFromId } from "./helper";

export const postDataForFoodCard = async (
  bodyJson = {
    lat: -36.91042,
    long: 174.7698112,
    range: 20,
    numberOfposts: 2,
  }
) => {
  let dataToReturn = [];
  const result = await PostService.getPosts(bodyJson);
  const uid = localStorage.getItem("uid");
  const user = await userService.getUser(uid);

  result.forEach((data, index) => {
    const liked = user.favourites.indexOf(data._id) > -1;
    let formattedDate = getTimestampFromId(data._id);
    let jsonForFoodCard = {
      id: data._id,
      foodName: data.foodName,
      image: data.imageURLs[0],
      numberOfLikes: data.numberOfLikes,
      rating: data.rating,
      timestamp: formattedDate,
      postLiked: liked,
    };

    dataToReturn[index] = jsonForFoodCard;
  });

  return dataToReturn;
};
