const { user } = require("../db/index.js");
const express = require("express");

const router = express.Router();

const userMiddleware = require("../middleware/user");

//router.post();

module.exports = router;
