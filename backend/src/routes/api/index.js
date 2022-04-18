const express = require("express");
const posts = require("./posts");
const restaurants = require("./restaurant");

const router = express.Router();

router.use("/posts", posts);
router.use("/restaurants", restaurants);

module.exports = router;
