const express = require("express");
const router = express.Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.create({
    username,
    password,
  });
  res.json({
    msg: "user created successfully",
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const isValidated = await User.findOne({ username });
  if (isValidated) {
    const token = jwt.sign({ username, password }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.json({
      msg: "Wrong credentials",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;

  const username = req.username; // ** gained through middleware

  await User.updateOne(
    { username: username },
    { $push: { purchasedCourses: courseId } }
  );
  res.json({
    msg: "course buyed ✌",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.username;
  console.log(username);

  const user = await User.findOne({
    username: username,
  });
  console.log(user.purchasedCourses);

  const courseBuyed = await Course.find({ _id: user.purchasedCourses });
  res.json({
    courseBuyed,
  });
});

module.exports = router;
