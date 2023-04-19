"use strict";

import { createServer } from "http";
import * as fs from "fs";
import mime from "mime";
import querystring from "querystring";

const default_storage = [{"title": "empty", "color": "red", "value": 1}]

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
    // Shows text in storage.json
    response.setHeader("Content-Type", "application/json");
    response.end(fs.readFileSync("storage.json"));

  } else if (request.url.startsWith("/add?")) {
    // Retrieves element and extracts features
    var element = request.url.substring(5);
    var title = querystring.parse(element).title;
    var value = querystring.parse(element).value;
    var color = querystring.parse(element).color;
    // We retrieve the JSON data and write the new element
    var storage = JSON.parse(fs.readFileSync("storage.json"));
    storage.push({ title: title, color: color, value: value });
    // We add to the storage.json the new data
    fs.writeFileSync("storage.json", JSON.stringify(storage));
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end();

  } else if (request.url.startsWith("/remove?")) {
    // Retrieves index from url
    var index = request.url.substring(14);
    // We retrieve the JSON data and write the new element
    var storage = JSON.parse(fs.readFileSync("storage.json"));
    // We remove the element associated to the index
    storage.splice(index, 1); 
    // We add to the storage.json the new data
    fs.writeFileSync("storage.json", JSON.stringify(storage));
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end();

  } else if (request.url.startsWith("/clear")) {
    // We rewrite "storage.json" using default_storage
    fs.writeFileSync("storage.json",JSON.stringify(default_storage));
    response.setHeader("Content-Type", "text/html; charset=utf-8");  
    response.end();

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
