const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  getUserFromFirebaseUID,
} = require("../../controllers/user");
const { checkAuth } = require("../../utils/middleware/checkAuth");

const router = express.Router();

router.use(checkAuth);
router.post("/", createUser);
router.get("/:id", getUser);
router.get("/firebase/:id", getUserFromFirebaseUID);
router.put("/:id", updateUser);

module.exports = router;
