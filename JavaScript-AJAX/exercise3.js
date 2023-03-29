"use strict";

var slides_JSON;

function load() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "slides.json");
  // Render JSON object
  xhr.onload = function () {
    slides_JSON = JSON.parse(this.responseText);
    // [TESTING] : responseText & XMLHTTP status
    window.alert(this.responseText);
    window.alert(this.status);
  };
  xhr.send();
}

function play() {
  for (var slide in slides_JSON.slides) {
    setTimeout(
      (url) => {
        var container = document.getElementById("container");
        // Remove elements all elements in container
        container.innerHTML = "";
        // Create frame for slide
        var iframe = document.createElement("iframe");
        iframe.src = url;
        // Add the iframe element to the container
        container.appendChild(iframe);
      },
      1000 * slide.time, //delay of the setTimeout function
      slide.url //param1 of setTimeout delayed function
    );
  }
}

load();
