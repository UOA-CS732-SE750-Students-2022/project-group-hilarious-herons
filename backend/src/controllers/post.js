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
      // const response = await Post.find({ restaurant: i._id });
      // console.log(response);
      distancesObj = [...distancesObj, { distance: distance, id: i._id }];
      // return i._id;
    }
  }

  distancesObj.sort((a, b) => {
    return a.distance - b.distance;
  });

  let posts = [];
  for (i in distancesObj) {
    const response = await Post.find({ restaurant: i._id });
    posts = [...posts, response];
  }
  return posts;
};

exports.getPosts = async (req, res) => {
  try {
    const { lat, long, desktop } = req.body;
    let { range } = req.body;

    if (!range) {
      range = 10000;
    }

    let posts = await getPostsFromDB(lat, long, range);

    return res.send(posts);
  } catch (err) {
    return res.status(500).json({
      success: false,
      info: err.message,
    });
  }
};
