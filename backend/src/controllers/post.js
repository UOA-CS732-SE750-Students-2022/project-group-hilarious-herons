const {
  retrievePost,
  updatePost,
  createPost,
} = require("../models/Post/posts-dao");
const Restaurant = require("../models/Restaurant/RestaurantSchema");
const mongoose = require("mongoose");
const {
  distanceCalculation,
} = require("../utils/distance/distanceCalculation");
const Post = require("../models/Post/PostSchema");
const {
  getReivewfromGoogle,
  getGooglePhoto,
} = require("../utils/googleApi/googleAPI");

const {
  retrieveRestaurant,
  createRestaurant,
} = require("../models/Restaurant/restaurant-dao");

const { updateUser } = require("../models/User/user-dao");
const User = require("../models/User/UserSchema");

/**
 * Get an post
 * @param {*} req query: lat, long params: id
 * @param {*} res 200 sucess or 404 not found
 */
exports.getPost = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const id = mongoose.Types.ObjectId(req.params.id);
    let post = await retrievePost(id);

    if (post === undefined || post === null || post.length === 0) {
      res.status(404).json({ success: false });
    }

    const restaurant = await retrieveRestaurant(post.restaurant);

    if (restaurant == null || restaurant.coordinates == null) {
      res.status(404).json({ success: false });
    }
    post.restaurant = restaurant;

    const distance = distanceCalculation(
      lat,
      long,
      restaurant.coordinates.lat,
      restaurant.coordinates.long
    );

    post = { ...post._doc, distance: distance };

    res.send(post);
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};

/**
 * Like post
 * @param {*} req body: id
 * @param {*} res 200 sucess, 404 not found 500 internal error
 */
exports.likePost = async (req, res) => {
  try {
    const objectId = mongoose.Types.ObjectId(req.body.id);
    const post = await retrievePost(objectId);

    if (post === undefined || post === null || post.length === 0) {
      res.status(404);
    }

    post.numberOfLikes = post.numberOfLikes + 1;

    updatePost(post);

    res.status(200).json({
      success: true,
      id: post.id,
      currentLikes: post.numberOfLikes,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};

/**
 * Unlike a post, reduce the number of like by 1 and can't be smaller than 0
 * @param {*} req body: id
 * @param {*} res 200 sucess, 404 not found 500 internal error
 */
exports.unlikePost = async (req, res) => {
  try {
    const objectId = mongoose.Types.ObjectId(req.body.id);
    const post = await retrievePost(objectId);

    if (post === undefined || post === null || post.length === 0) {
      res.status(404);
    }

    if (post.numberOfLikes > 0) {
      post.numberOfLikes = post.numberOfLikes - 1;
    }

    updatePost(post);

    res.status(200).json({
      success: true,
      id: post.id,
      currentLikes: post.numberOfLikes,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};

/**
 * create a post
 * @param {*} req
 * @param {*} res 201 success, 500 internal errors
 */
exports.createPost = async (req, res) => {
  try {
    const {
      foodName,
      bodyText,
      tags,
      numberOfLikes,
      rating,
      dietryRequirements,
      numberOfReviews,
      restaurantId,
      imageURLs,
      userId,
    } = req.body;

    const restaurant = await retrieveRestaurant(restaurantId);

    const postObj = {
      foodName,
      bodyText,
      tags,
      numberOfLikes,
      dietryRequirements,
      rating,
      numberOfReviews,
      restaurant,
      imageURLs,
    };

    const newPost = await createPost(postObj);

    let user = await User.findOne({ firebaseUUID: userId });

    user.posts = [...user.posts, newPost._id];

    updateUser(user);

    res
      .status(201)
      .header("Location", `/api/post/${newPost._id}`)
      .json(newPost);
  } catch (err) {
    res.status(500).json({
      success: false,
      info: err.message,
    });
  }
};

/**
 * Fetch posts from database
 * @param {*} lat latitude of the current position
 * @param {*} long longitude of the current position
 * @param {*} range range it wants the posts to be, km
 * @returns
 */
const getPostsFromDB = async (lat, long, range) => {
  const response = await Restaurant.find({});

  let distancesObj = [];
  for (i of response) {
    const distLat = i.coordinates.lat;
    const distLong = i.coordinates.long;
    const distance = distanceCalculation(lat, long, distLat, distLong);

    if (distance < range) {
      distancesObj = [...distancesObj, { distance: distance, id: i._id }];
    }
  }

  distancesObj.sort((a, b) => {
    return a.distance - b.distance;
  });

  let posts = [];
  for (i of distancesObj) {
    const response = await Post.find({ restaurant: i.id });
    for (data of response) {
      data = { ...data._doc, distance: i.distance };
      posts = [...posts, data];
    }
  }

  return posts;
};

/**
 * Fetch posts from google review
 * @param {*} lat latitude of the user current coordination
 * @param {*} long longitude of the user current coordination
 * @param {*} range range of search
 * @param {*} numberOfposts number of posts we want
 * @param {*} postPerRestaurant  number of review we want to fetch from each restaurant
 * @returns
 */
const getPostFromGoogle = async (
  lat,
  long,
  range,
  numberOfposts = 9,
  postPerRestaurant = 2
) => {
  try {
    const response = await getReivewfromGoogle(lat, long, range);
    let allPosts = [];

    for (data of response) {
      const distance = distanceCalculation(
        lat,
        long,
        data.geometry.location.lat,
        data.geometry.location.lng
      );
      if (
        data.photos == undefined ||
        data.opening_hours == undefined ||
        data.name == undefined ||
        data.formatted_address == undefined ||
        data.geometry == undefined
      ) {
        continue;
      }
      for (let i = 0; i < postPerRestaurant; i++) {
        const existPostName = await Post.find({
          foodName: data.name,
        });

        if (existPostName.length >= 2) {
          break;
        }

        if (
          data.photos.length > 0 &&
          data.photos[Math.floor(Math.random() * 5)].photo_reference
        ) {
          const photoRef =
            data.photos[Math.floor(Math.random() * 5)].photo_reference;
          // let imageURL = null;

          let imageURL = await getGooglePhoto(photoRef);

          const existingPost = await Post.find({
            imageURLs: { $in: [imageURL] },
          });

          if (existingPost.length < 1) {
            let restaurant = await Restaurant.find({
              googlePlaceId: data.place_id,
            });

            if (restaurant.length < 1) {
              const restaurantObj = {
                name: data.name,
                address: data.formatted_address,
                coordinates: {
                  lat: data.geometry.location.lat,
                  long: data.geometry.location.lng,
                },
                googlePlaceId: data.place_id,
                googleMapsURL: data.url,
                openHours: data.opening_hours.weekday_text,
              };

              restaurant = await createRestaurant(restaurantObj);
            } else {
              restaurant = restaurant[0];
            }

            const postObj = {
              foodName: data.name,
              bodyText: data.name,
              tags: [data.name, "Restaurant", "Food"],
              numberOfLikes: 0,
              rating: data.rating == undefined ? 0 : data.rating,
              numberOfReviews: 0,
              imageURLs: [imageURL],
              restaurant: restaurant,
            };

            let post = await createPost(postObj);
            post = {
              ...post._doc,
              distance: distance,
            };
            allPosts = [...allPosts, post];
            numberOfposts--;
          }
        }
        if (numberOfposts <= 0) {
          break;
        }
      }
      if (numberOfposts <= 0) {
        break;
      }
    }

    return allPosts;
  } catch (err) {
    throw err;
  }
};

/**
 * Get posts within a specific range of the user current coordination
 * @param {*} req
 * @param {*} res 200 success, 500 internal error
 * @returns
 */
exports.getPosts = async (req, res) => {
  try {
    const { lat, long } = req.query;

    let { range, numberOfposts } = req.query;
    if (!range) {
      range = 10;
    }
    if (!numberOfposts || numberOfposts < 10) {
      numberOfposts = 10;
    }

    let posts = await getPostsFromDB(lat, long, range);

    range = range * 1000; //convert to meter
    if (posts.length < numberOfposts) {
      const num = numberOfposts - posts.length;
      const googleposts = await getPostFromGoogle(lat, long, range, num);

      posts = posts.concat(googleposts);
      posts = posts.sort((a, b) => {
        return a.distance - b.distance;
      });
    }

    res.send(posts);
  } catch (err) {
    return res.status(500).json({
      success: false,
      info: err.message,
    });
  }
};

/**
 * Search for posts that its tags and name contains the search keyword
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.searchPost = async (req, res) => {
  const {
    lat,
    long,
    searchKeyWord,
    dietryRequirements,
    sortByDistance = false,
    sortByRating = false,
  } = req.query;

  let result;
  if (!dietryRequirements) {
    result = await Post.find({
      $or: [
        { foodName: { $regex: `(?i)${searchKeyWord}` } },
        { tags: { $regex: `(?i)${searchKeyWord}` } },
      ],
    });
  } else {
    result = await Post.find({
      $or: [
        { foodName: { $regex: `(?i)${searchKeyWord}` } },
        { tags: { $regex: `(?i)${searchKeyWord}` } },
      ],
      dietryRequirements: { $in: dietryRequirements },
    });
  }

  if (result.length == 0) {
    return res.status(404).json({});
  }

  const distantMap = new Map();
  let resultWithDistance = [];
  for (let data of result) {
    const restaurant = await retrieveRestaurant(data.restaurant);
    if (restaurant == null) {
      continue;
    }
    const restaurantLat = restaurant.coordinates.lat;
    const restaurantLong = restaurant.coordinates.long;
    const mapResult = distantMap.get(restaurantLat + restaurantLong);
    let distance;
    if (mapResult == null || mapResult == undefined) {
      distance = distanceCalculation(lat, long, restaurantLat, restaurantLong);
      distantMap.set(restaurantLat + restaurantLong, distance);
    } else {
      distance = mapResult;
    }

    data = { ...data._doc, distance: distance };
    resultWithDistance = [...resultWithDistance, data];
  }

  if (sortByRating) {
    resultWithDistance = resultWithDistance.sort((a, b) => {
      return b.rating - a.rating;
    });
  } else {
    resultWithDistance = resultWithDistance.sort((a, b) => {
      return a.distance - b.distance;
    });
  }

  res.send(resultWithDistance);
};
