const express = require("express");
const { getPost, likePost, unlikePost } = require("../controllers/post");

const router = express.Router();

router.route("/post/:id").get(getPost);
router.route("/post/like-post").post(likePost);
router.route("/post/unlike-post").post(unlikePost);

module.exports = router;
