const express = require("express");
const port = 3050;

const app = express();

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on " + port);
});
