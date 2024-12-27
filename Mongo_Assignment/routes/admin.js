const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db/index.js");
const { Router } = require("express");
const router = Router();
// does not mean, this handles the /signup endpoint, as it handles /admin/signup requests

// Admin Routes
router.post("/signup", adminMiddleware, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: username,
    password: password,
  });
  res.json({
    msg: "Admin Created Successfully",
  });
});

// router.post("/courses", adminMiddleware, (req, res) => {
//   // Implement course creation logic
// });

// router.get("/courses", adminMiddleware, (req, res) => {
//   // Implement fetching all courses logic
// });

module.exports = router;
