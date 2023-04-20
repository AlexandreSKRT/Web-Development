"use strict";

import * as fs from "fs";
import express, { response } from "express";
import { request } from "http";

//*************************** INIT SERVER *****************************//

// We create the server using "express"
const server = express();

// Allows the server to deal with json POST request
server.use(express.json());

//*********************************************************************//

//************************** HANDLE REQUESTS **************************//

// Send Hi when getting '/' request
server.get("/", (request, response) => {
  response.send("Hi");
});

// Kill server when getting '/kill' request
server.get("/kill", (request, response) => {
  response.send("The server will stop now");
  process.exit(0);
});

// Reloads db.json in memory; const db <- db.json
server.get("/restart", (request, response) => {
  const db = JSON.parse(fs.readFileSync("db.json"));
  response.send("db.json reloaded");
});

// Replies the number of publications documented in db.json
server.get("/papercount", (request, response) => {
  response.contentType("text/plain");
  var db = JSON.parse(fs.readFileSync("db.json"));
  response.send(db.length.toString());
});

// Answers the number of publications where the name of one of the authors contains xxx
server.get("/auth/:xxx", (request, response) => {
  // init params
  var substring = request.params.xxx.toLowerCase();
  var db = JSON.parse(fs.readFileSync("db.json"));
  var count = 0;
  // iterates in the db to count authors respecting the prev. condition
  try {
    for (var publication of db) {
      for (var author of publication.authors) {
        // console.log("Substring : " +substring +"; Author to test : " +author.toLowerCase());
        if (author.toLowerCase().includes(substring)) {
          count += 1;
        }
      }
    }
  } catch (error) {
    response.status(404);
    response.send(error);
  }
  // sends reponse
  response.contentType("text/plain");
  response.send(count.toString());
});

//*********************************************************************//

// Listens to the port given in command line
server.listen(process.argv[2], () => {});
