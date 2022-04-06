const {
  retrievePost,
  updatePost,
  createPost,
} = require("../models/Post/posts-dao");
const mongoose = require("mongoose");

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
    const postObj = req.body;
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
