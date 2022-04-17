const express = require("express");
const { createUser, getUser, updateUser } = require("../../controllers/user");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);

module.exports = router;
