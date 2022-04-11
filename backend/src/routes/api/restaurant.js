const express = require("express");
const { getRestaurantDetail } = require("../../controllers/restaurant");

const router = express.Router();

router.get("/", getRestaurantDetail);

module.exports = router;
