const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index.js");
const router = express.Router();
// does not mean, this handles the /signup endpoint, as it handles /admin/signup requests

// Admin Routes
router.post("/signup", async (req, res) => {
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





router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  //if you see below when the course is created then it should get the id also this functionality was not there in /signup thing, so you take the response in the object and check the object by log (newCourse), and then return the id like this : newCourse._id
  const newCourse = await Course.create({
    title: title,
    description: description,
    imageLink: imageLink,
    price: price,
  });
  console.log(newCourse);

  res.json({
    msg: "Course added successfully",
    courseId: newCourse._id,
  });
});





router.get("/courses", adminMiddleware, async (req, res) => {
  const allCourse = await Course.find({});
  res.json({
    courses: allCourse,
  });
});

module.exports = router;
