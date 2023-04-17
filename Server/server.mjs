"use strict";

import { createServer } from "http";
import * as fs from "fs";
import mime from "mime";
import querystring from "querystring";

var listVisitors = [];

// request processing
function webserver(request, response) {
  console.log(request.url);

  if (request.url == "/kill") {
    // Kill Process -> shuts down server
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("<!doctype html><html><body>The server will stop now.</body></html>");
    process.exit(0);

  } else if (request.url == "/clear") {
    // Clear visitors historic
    listVisitors = [];
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("<!doctype html><html><body>The visitors historic has been cleaned.</body></html>");

  } else if (request.url.startsWith("/hi?nom=")){
    // GET request -> "/hi?nom="
    var name = querystring.unescape(request.url.substr(8));
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("<!doctype html><html><body> hi " + name + "</body></html>");

  } else if (request.url.startsWith("/salut?visiteur=")) {
    // GET request -> "/salut?visiteur="
    var visitor = querystring.unescape(request.url.substr(16));
    visitor = visitor.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("<!doctype html><html><body>salut " + visitor + ", the following users have already visited this page: " + listVisitors.join(", ") + "</body></html>");
    listVisitors.push(visitor);

  } else if (request.url.startsWith("/www/")) {
    // Handle files
    var required_path = request.url.substr(5);
    // console.log(required_path);
    if(fs.existsSync(required_path)){
        response.setHeader("Content-Type", mime.getType(required_path));  
        response.end(fs.readFileSync(required_path));
    }
    else if(required_path.includes('..')){
        response.statusCode=404;
        response.end("<!doctype html><html><body>The server is not serving files in parent directories.</body></html>"); 
    }
    else{
        response.statusCode=404;
        response.end("<!doctype html><html><body>File does not exist.</body></html>");
    }

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
