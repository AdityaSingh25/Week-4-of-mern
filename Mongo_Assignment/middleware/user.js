const { User } = require("../db/index.js");

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  User.findOne({
    username: username,
    password: password,
  }).then(function (value) {
    if (value) {
      next();
    } else {
      res.status(403).json({
        msg: "User doesnot exists",
      });
    }
  });
}


module.exports = userMiddleware;