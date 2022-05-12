const express = require("express");
const {
  createPost,
  getPost,
  likePost,
  unlikePost,
  getPosts,
  searchPost,
} = require("../../controllers/post");
const { upload } = require("../../controllers/uploadImage");
const { checkAuth } = require("../../utils/middleware/checkAuth");

const router = express.Router();

router.get("/", getPosts);
router.get("/search", searchPost);
router.get("/:id", getPost);

router.use(checkAuth);
router.post("/", createPost);
router.post("/like-post", likePost);
router.post("/unlike-post", unlikePost);
router.post("/image", upload);

module.exports = router;
