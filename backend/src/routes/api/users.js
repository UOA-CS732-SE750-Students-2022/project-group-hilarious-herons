const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  getUserFromFirebaseUID,
} = require("../../controllers/user");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.get("/firebase/:id", getUserFromFirebaseUID);
router.put("/:id", updateUser);

module.exports = router;
