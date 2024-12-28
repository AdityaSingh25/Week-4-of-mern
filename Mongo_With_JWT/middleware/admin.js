const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  // token look like this : Beares asadajldajas......
  const words = token.split(" ");
  const jwtToken = words[1];

  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    //why we use .username?
    // as when the token was signed using this password we used username and password to generae the token. So if username exists after decoding the  proceed next or else send status code 403
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: "Your are not authenticated",
      });
    }
  } catch (e) {
    res.json({
      msg: "Incorrect Inputs",
    });
  }
}

module.exports = adminMiddleware;
