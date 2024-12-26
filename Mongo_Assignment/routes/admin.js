const express = require("express");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();

// does not mean, this handles the /signup endpoint, as it handles /admin/signup requests

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
