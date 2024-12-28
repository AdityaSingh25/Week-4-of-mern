const express = require("express");
const { Admin, User, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username,
    password,
  });
  res.json({
    msg: "Admin created successfully",
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const isValidated = await Admin.findOne({ username, password });

  if (isValidated) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.json({
      msg: "wrong username and password",
    });
  }
});

router.post("/course", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  res.json({
    msg: `Course created successfully with course id : ${newCourse._id}`,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    "All courses are": allCourses,
  });
});
module.exports = router;
