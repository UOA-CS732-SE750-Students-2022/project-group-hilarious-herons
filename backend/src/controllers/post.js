const { retrievePost, createPost } = require("../models/Post/posts-dao");
const mongoose = require("mongoose");

exports.getPost = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const post = await retrievePost(id);
    console.log(post);

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
