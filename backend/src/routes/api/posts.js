const express = require("express");
const {
  createPost,
  getPost,
  likePost,
  unlikePost,
} = require("../../controllers/post");
const { upload } = require("../../controllers/imageProcess");

const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.post("/like-post", likePost);
router.post("/unlike-post", unlikePost);
router.post("/image", upload);

module.exports = router;
