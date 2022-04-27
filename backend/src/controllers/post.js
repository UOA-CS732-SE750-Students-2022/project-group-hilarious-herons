const {
  retrievePost,
  updatePost,
  createPost,
} = require("../models/Post/posts-dao");
const Restaurant = require("../models/Restaurant/RestaurantSchema");
const { retrieveRestaurant } = require("../models/Restaurant/restaurant-dao");
const mongoose = require("mongoose");
const {
  distanceCalculation,
} = require("../utils/distance/distanceCalculation");
const Post = require("../models/Post/PostSchema");
const {
  getReivewfromGoogle,
  getGooglePhoto,
} = require("../utils/googleApi/googleAPI");
const { createRestaurant } = require("../models/Restaurant/restaurant-dao");
const { post } = require("../routes");

exports.getPost = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const post = await retrievePost(id);

    if (post === undefined || post === null || post.length === 0) {
      res.status(404);
    }

    res.send(post);
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};

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

exports.createPost = async (req, res) => {
  try {
    const {
      foodName,
      bodyText,
      tags,
      numberOfLikes,
      rating,
      numberOfReviews,
      restaurantId,
    } = req.body;

    console.log(req);

    const restaurant = await retrieveRestaurant(restaurantId);
    console.log(req.body);
    console.log(req.body.file);

    const postObj = {
      foodName,
      bodyText,
      tags,
      numberOfLikes,
      rating,
      numberOfReviews,
      restaurant,
    };

    const newPost = await createPost(postObj);

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
    const processedData = response.map((data) => {
      return { ...data._doc, distance: i.distance };
    });
    posts = posts.concat(processedData);
  }

  return posts;
};

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
      for (let i = 0; i < postPerRestaurant; i++) {
        const existPostName = await Post.find({
          foodName: data.name,
        });

        if (existPostName.length >= 2) {
          break;
        }

        if (data.photos[Math.floor(Math.random() * 5)].photo_reference) {
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
              rating: 0,
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

exports.getPosts = async (req, res) => {
  try {
    const { lat, long } = req.body;
    let { range, numberOfposts } = req.body; //km

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
