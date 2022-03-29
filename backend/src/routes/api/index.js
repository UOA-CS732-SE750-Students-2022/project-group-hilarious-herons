const express = require("express");
const posts = require("./posts");

const router = express.Router();

router.use("/posts", posts);
