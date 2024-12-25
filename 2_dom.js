const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.get("/sum", (req, res) => {
  console.log("Request received:", req.query);
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  const sum = a + b;
  console.log("Sum calculated:", sum);
  res.send(sum.toString());
});

app.listen(3000, () => {
  console.log(`server is running on port`);
});
