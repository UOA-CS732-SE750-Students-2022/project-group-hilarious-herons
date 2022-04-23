const express = require("express");
const posts = require("./posts");
const users = require("./users");
const restaurants = require("./restaurant");

const router = express.Router();

router.use("/posts", posts);
router.use("/users", users);
router.use("/restaurants", restaurants);

module.exports = router;
