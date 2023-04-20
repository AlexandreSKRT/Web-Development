"use strict";

import * as fs from "fs";
import express, { response } from "express";
import { request } from "http";
import { pid } from "process";

//*************************** INIT SERVER *****************************//

// We create the server using "express"
const server = express();

// Allows the server to deal with json POST request
server.use(express.json());

//*********************************************************************//

//************************* INIT VARIABLES ****************************//

const imaginary_publication = {
  key: "imaginary",
  title: "Web-Development Lab on server 2",
  journal: "Télécom Paris; Top 10 publications",
  year: "2023",
  month: "apr",
  keywords: "Web-Development, Server, REST",
  lang: "en",
  authors: ["A. Sukeratha"],
  category: "article",
  state: "published",
  dept: "webdesign",
  group: "sdr",
};

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

// Answers the descriptors of publications whose names of authors contain xxx
server.get("/papers_from/:xxx", (request, response) => {
  // init params
  var substring = request.params.xxx.toLowerCase();
  var db = JSON.parse(fs.readFileSync("db.json"));
  var descriptors = [];
  // iterates in the db to find the descriptors with authors matching the previous requirement
  try {
    for (var publication of db) {
      for (var author of publication.authors) {
        if (author.toLowerCase().includes(substring)) {
          descriptors.push(publication);
          break;
        }
      }
    }
  } catch (error) {
    response.status(404);
    response.send(error);
  }
  // sends reponse
  response.contentType("application/json");
  response.send(descriptors);
});

// Answers the titles of publications whose names of authors contain xxx
server.get("/ttlist/:xxx", (request, response) => {
  // init params
  var substring = request.params.xxx.toLowerCase();
  var db = JSON.parse(fs.readFileSync("db.json"));
  var publication_names = [];
  // iterates in the db to find the descriptors with authors matching the previous requirement
  try {
    for (var publication of db) {
      for (var author of publication.authors) {
        if (author.toLowerCase().includes(substring)) {
          publication_names.push(publication.title);
          break;
        }
      }
    }
  } catch (error) {
    response.status(404);
    response.send(error);
  }
  // sends reponse
  response.contentType("application/json");
  response.send(publication_names);
});

server.get("/publication/:xxx", (request, response) => {
  // init params
  var key_request = request.params.xxx;
  var db = JSON.parse(fs.readFileSync("db.json"));
  // iterates in the db to find the publication with corresponding key
  try {
    for (var publication of db) {
      if (publication.key == key_request) {
        // sends reponse
        response.contentType("application/json");
        response.send(publication);
      }
    }
  } catch (error) {
    response.status(404);
    response.send(error);
  }
});

server.delete("/publication/:xxx", (request, response) => {
  // init params
  var key_request = request.params.xxx;
  var index_publication;
  var is_publication_found = false;
  var db = JSON.parse(fs.readFileSync("db.json"));
  // iterates in the db to find the index of the publication
  try {
    for (index in db) {
      if (db[index].key == key_request) {
        index_publication = index;
        is_publication_found = true;
      }
    }
  } catch (error) {
    response.status(404);
    response.send(error);
  }
  // Deletes the publication with associated key
  if (is_publication_found) {
    df.splice(index_publication, 1);
    console.log("Publication deleted");
    response.send();
  }
});

server.post("/publication", (request, response) => {
    // init params
    var db = JSON.parse(fs.readFileSync("db.json"));
    // [TO CODE ...]
    db.push(imaginary_publication); 
})

server.put("/publication", (request, response) => {
    // init params
    var key_request = request.params.xxx; 
    var db = JSON.parse(fs.readFileSync("db.json"));
    // [TO CODE ...]
})


//*********************************************************************//

// Listens to the port given in command line
server.listen(process.argv[2], () => {});
