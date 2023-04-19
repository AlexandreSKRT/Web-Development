"use strict";

import { createServer } from "http";
import * as fs from "fs";
import mime from "mime";
import querystring from "querystring";

// request processing
function webserver(request, response) {
  console.log(request.url);

  if (request.url == "/kill") {
    // Kill Process -> shuts down server
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(
      "<!doctype html><html><body>The server will stop now.</body></html>"
    );
    process.exit(0);

  } else if (request.url.startsWith("/WWW/")) {
    // Handle files
    var required_path = request.url.substr(5);
    // console.log(required_path);
    if (fs.existsSync(required_path)) {
      response.setHeader("Content-Type", mime.getType(required_path));
      response.end(fs.readFileSync(required_path));
    } else if (required_path.includes("..")) {
      response.statusCode = 404;
      response.end(
        "<!doctype html><html><body>The server is not serving files in parent directories.</body></html>"
      );
    } else {
      response.statusCode = 404;
      response.end(
        "<!doctype html><html><body>File does not exist.</body></html>"
      );
    }
  } else if (request.url.startsWith("/show")) {
    response.setHeader("Content-Type", "application/json");  
    response.end(fs.readFileSync("storage.json"));

  } else {
    // Server works!
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("<!doctype html><html><body>Server works!</body></html>");
  }
}
try {
  // create server object
  const server = createServer(webserver);
  // server listens
  server.listen(process.argv[2], (err) => {});
} catch (e) {}
