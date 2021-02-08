const http = require("http");
const fs = require("fs");
const httpPort = 8080;

http
  .createServer((req, res) => {
    fs.readFile(__dirname + "/dist/index.html", "utf-8", (err, content) => {
      if (err) {
        console.log('We cannot open "index.html" file.');
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });

      res.end(content);
    });
  })
  .listen(httpPort, () => {
    console.log("Server listening on: http://localhost:%s", httpPort);
  });

// const express = require("express");
// const port = 3050;

// const app = express();

// app.use(express.static(__dirname + "/dist/"));
// app.get(/.*/, function(req, res) {
//   res.sendFile(__dirname + "/dist/index.html");
// });

// app.listen(port, "0.0.0.0", () => {
//   console.log("Server is running on " + port);
// });
