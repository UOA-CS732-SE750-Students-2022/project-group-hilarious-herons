const express = require("express");

const { getNearbyRestaurant, hello } = require("../Controllers/googleAPI");

const router = express.Router();

router.route("/nearby-restaurant").get(getNearbyRestaurant);
router.route("/").get(hello);

module.exports = router;
