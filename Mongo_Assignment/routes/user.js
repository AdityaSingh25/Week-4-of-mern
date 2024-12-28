const { User, Course } = require("../db/index.js");
const express = require("express");

const router = express.Router();

const userMiddleware = require("../middleware/user");

//User routes
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

//like to get all the courses present in website
router.get("/courses", async (req, res) => {
  const allCourse = await Course.find({});
  res.json({
    "Courses present in our site": allCourse,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    msg: "Course buyed 👍",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const user = await User.findOne({
    username: username,
  });
  console.log(user.purchasedCourses);

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    courses: courses,
  });
});
module.exports = router;
