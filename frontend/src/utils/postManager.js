import { PostService } from "../services/PostService"
import { getTimestampFromId } from "./helper"

export const postDataForFoodCard = async (bodyJson = {
    "lat": -36.91042,
    "long": 174.7698112,
    "range": 20,
    "numberOfposts": 2
}) => {
    let dataToReturn = []
    const result = await PostService.getPosts(bodyJson)
    result.forEach((data, index) => {
        let formattedDate = getTimestampFromId(data._id)
        let jsonForFoodCard = {
            id: data._id,
            foodName: data.foodName,
            image: data.imageURLs[0],
            numberOfLikes: data.numberOfLikes,
            rating: data.rating,
            timestamp: formattedDate,
            postLiked: false // Need to add user connected status later
        }
        dataToReturn[index] = jsonForFoodCard
    })
    return dataToReturn;
}