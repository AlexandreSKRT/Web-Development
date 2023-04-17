"use strict";

import { createServer } from "http";
import querystring from "querystring";
import * as fs from "fs";
import mime from "mime";

// request processing
function webserver(request, response) {
  response.setHeader("Content-Type", "text/html; charset=utf-8");

  // Kill Process -> shuts down server
  if (request.url == "/kill") {
    response.end(
      "<!doctype html><html><body>The server will stop now.</body></html>"
    );
    process.exit(0);

  // GET request -> 'hi?user='
  } else if (request.url.includes('/hi?nom=')) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    var name = querystring.unescape(request.url.substr(9));
    response.end("<!doctype html><html><body> hi " + name + "</body></html>");

  // Handle files request
  } else {
    const req_path = request.url.slice(1);
    console.log(req_path);

    // Check that the server is not serving files in parent directories
    if (req_path.includes("..")) {
      response.statusCode = 404;
      response.end(
        "<!doctype html><html><body>The server is not serving files in parent directories.</body></html>"
      );
    }

    // Check if the file exists inside the parent directory
    fs.access(req_path, (err) => {
      if (err) {
        // Send error statusCode 404
        response.statusCode = 404;
        response.end(
          "<!doctype html><html><body>File not found.</body></html>"
        );
      } else {
        // Send File
        response.setHeader("Content-Type", mime.getType(req_path));
        response.end(fs.readFileSync(req_path));
      }
    });
  }
}

// create server object
const server = createServer(webserver);

// server listens
server.listen(process.argv[2], (err) => {});
