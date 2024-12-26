const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require("./routes/admn");
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());

//app.use new way, it tells that any request comes to /admin/anything*** to to adminRouter, similar way any request to /user/anything ->> go to userRouter
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
