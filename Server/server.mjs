"use strict";

import {createServer} from "http";

// request processing
function webserver( request, response ) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");  

    if (request.url == "/kill"){
        response.end("<!doctype html><html><body>The server will stop now.</body></html>"); 
        process.exit(0);
    }

    response.end("<!doctype html><html><body>Server works.</body></html>");
}

// create server object
const server = createServer(webserver);

// server listens
server.listen(process.argv[2], (err) => {});