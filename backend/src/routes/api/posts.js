const express = require("express");
const {
  createPost,
  getPost,
  likePost,
  unlikePost,
} = require("../../controllers/post");

const router = express.Router();

router.post("/", createPost);
router.route("/:id").get(getPost);
router.route("/like-post").post(likePost);
router.route("/unlike-post").post(unlikePost);

module.exports = router;
