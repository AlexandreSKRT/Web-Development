"use strict";

//******************************* VARIABLES *******************************//

var slides_JSON; // all slides retrieved from the json
var timeout_stack = []; // contains all calls of the setTimeout function
var current_slide; // current slide displayed
var is_paused; // boolean : is the diaporama paused?

//******************************* FUNCTIONS *******************************//

function load() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "slides.json");
  // Render JSON object
  xhr.onload = function () {
    slides_JSON = JSON.parse(this.responseText);
    // [TESTING] : responseText & XMLHTTP status
    // window.alert(this.responseText);
    // window.alert(this.status);
  };
  xhr.send();
}

load();

//window.alert("restarted");

// Reset the timeout_stack
function reset_stack() {
  for (var i = 0; i < timeout_stack.length; i++) {
    clearTimeout(timeout_stack[i]);
  }
}

// Continue the diaporama from the current slide
function continue_from_current_slide() {
  // add to the timeout_stack all slides with time>
  for (var slide in slides_JSON.slides) {
    if (slides_JSON.slides[slide].time > current_slide.time) {
      timeout_stack.push(
        setTimeout(
          display_slide,
          1000 * slides_JSON.slides[slide].time,
          slides_JSON.slides[slide]
        )
      );
    }
  }
  return;
}

// Show a specefic slide
function display_slide(slide) {
  // current slide <- input slide
  current_slide = slide;
  // Remove elements all elements in container
  var container = document.getElementById("container");
  container.innerHTML = "";
  // Create frame for slide
  var iframe = document.createElement("iframe");
  iframe.src = slide.url;
  // Add the iframe element to the container
  container.appendChild(iframe);
}

function play() {
  //window.alert("play function");
  reset_stack();
  // is_paused status is set to False
  is_paused = false;
  // each slide is added to the timeout_stack
  for (var slide in slides_JSON.slides) {
    timeout_stack.push(
      setTimeout(
        display_slide,
        1000 * slides_JSON.slides[slide].time,
        slides_JSON.slides[slide]
      )
    );
  }
}

function pause() {
  if (typeof is_paused === "undefined") {
    return;
  } else {
    if (!is_paused) {
      // [SITUATION] : PAUSE
      reset_stack(); // resetting the stack pauses the diaporama
      is_paused = true;
    } else {
      // [SITUATION] : CONTINUE
      // window.alert("continue");
      continue_from_current_slide();
      is_paused = false;
    }
  }
  return;
}

function next() {
  is_paused = true;
  reset_stack();
  if (typeof current_slide === "undefined") {
    display_slide(slides_JSON.slides[0]);
  } else {
    var current_index = slides_JSON.slides.findIndex(
      (slide) => slide === current_slide
    ); // find the index of the current slide
    var next_index = slides_JSON.slides.findIndex(
      (slide) => slide.time > current_slide.time
    ); // find the index of the next slide based on the time property
    var next_slide = next_index !== -1 ? slides_JSON.slides[next_index] : null; // get the next slide object or null if not found
    if (next_slide) {
      display_slide(next_slide);
    } else {
      display_slide(slides_JSON.slides[0]);
    }
  }
  return;
}

function previous() {
  is_paused = true;
  reset_stack();
  if (typeof current_slide === "undefined") {
    display_slide(slides_JSON.slides[slides_JSON.slides.length - 1]);
  } else {
    // find the index of the current slide
    var current_index = slides_JSON.slides.findIndex(
      (slide) => slide === current_slide
    );
    // find the index of the previous slide
    var previous_index = slides_JSON.slides
      .slice(0, current_index)
      .reverse()
      .findIndex((slide) => slide.time < current_slide.time);
    // get the previous slide object or null if not found
    var previous_slide =
      previous_index !== -1
        ? slides_JSON.slides.slice(0, current_index).reverse()[previous_index]
        : null;
    // display previous slide (last slide if not start / 1st slide)
    if (previous_slide) {
      display_slide(previous_slide);
    } else {
      display_slide(slides_JSON.slides[slides_JSON.slides.length - 1]);
    }
  }
  return;
}
