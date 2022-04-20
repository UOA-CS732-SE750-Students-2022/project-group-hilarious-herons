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
const { getReivewfromGoogle } = require("../utils/googleApi/googleAPI");

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
    posts = posts.concat(response);
  }
  return posts;
};

const getPostFromGoogle = async (lat, long, range) => {
  const response = await getReivewfromGoogle(lat, long, range);
  for (data of response) {
    const href = data.photos[0].html_attributions[0];
    // console.log(href);

    const link = getImageFromHref(href);
    console.log(link);
    // const postObj = {
    //   foodName :data.name,
    //   bodyText:null,
    //   tags:[data.name,"Restaurant","Food"],
    //   numberOfLikes:0,
    //   rating:0,
    //   numberOfReviews:0,
    //   imageURLs
    //   restaurant,
    // };
  }
  return response;
};

const getImageFromHref = (html) => {
  return html.match(/href="([^"]*)/)[1];
};

exports.getPosts = async (req, res) => {
  try {
    const { lat, long, desktop } = req.body;
    let { range } = req.body; //km

    if (!range) {
      range = 10;
    }
    // TODO: Remove comment
    // let posts = await getPostsFromDB(lat, long, range);
    range = range * 1000; //convert to meter
    const posts = await getPostFromGoogle(lat, long, range);
    // console.log(posts);
    return res.send(posts);
  } catch (err) {
    return res.status(500).json({
      success: false,
      info: err.message,
    });
  }
};
