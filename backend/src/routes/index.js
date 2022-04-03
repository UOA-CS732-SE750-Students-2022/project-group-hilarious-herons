const express = require("express");
const {
  getPost,
  likePost,
  unlikePost,
  createPost,
} = require("../controllers/post");

const router = express.Router();
const api = require("./api");

router.use("/api", api);
router.route("/post/:id").get(getPost);
router.route("/post/like-post").post(likePost);
router.route("/post/unlike-post").post(unlikePost);

router.use("/api", api);

module.exports = router;
