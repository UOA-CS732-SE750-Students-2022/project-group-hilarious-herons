const express = require("express");
const { getPost } = require("../controllers/post");

const router = express.Router();

router.route("/get-post/:id").get(getPost);

module.exports = router;
