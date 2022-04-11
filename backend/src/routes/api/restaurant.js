const express = require("express");
const { getRestaurantDetail } = require("../../controllers/restaurant");

const router = express.Router();

router.post("/", getRestaurantDetail);

module.exports = router;
