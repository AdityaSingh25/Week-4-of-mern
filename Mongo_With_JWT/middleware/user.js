const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  // token look like this : Beares asadajldajas......
  const words = token.split(" ");
  const jwtToken = words[1];

  const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
  req.username = decodedValue.username; // **very imp -> this will pass this info to next function call, as one of the key features of middlewares is to pass the info also
  //why we use .username?
  // as when the token was signed using this password we used username and password to generae the token. So if username exists after decoding the  proceed next or else send status code 403
  if (decodedValue.username) {
    next();
  } else {
    res.status(403).json({
      msg: "Your are not authenticated",
    });
  }
}

module.exports = userMiddleware;
