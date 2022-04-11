const express = require("express");
const {
  createPost,
  getPost,
  likePost,
  unlikePost,
} = require("../../controllers/post");

const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.post("/like-post", likePost);
router.post("/unlike-post", unlikePost);

module.exports = router;
