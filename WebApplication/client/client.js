"use strict";

function show_text() {
  // Retrieves container + refreshes it
  var container = document.getElementById("MAINSHOW");
  container.innerHTML = "";
  // XMLHTTP request -> server1.mjs
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../show");
  xhr.onload = function () {
    container.textContent = this.responseText;
  };
  xhr.send();
}

function display_add_form() {
  document.getElementById("form_add_element").style.visibility = "visible";
}

function display_remove_form() {
  document.getElementById("form_remove_element").style.visibility = "visible";
}

function add_element() {
  // Retrieves container + refreshes it
  var container = document.getElementById("MAINSHOW");
  container.innerHTML = "";
  // Retrieves element in the form
  var title = document.getElementById("titleTF").value;
  var value = document.getElementById("valueTF").value;
  var color = document.getElementById("colorTF").value;
  // XMLHTTP request -> server1.mjs
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "../../add?title=" + title + "&value=" + value + "&color=" + color
  );
  xhr.send();
}

function remove_element() {
  // Retrieves container + refreshes it
  var container = document.getElementById("MAINSHOW");
  container.innerHTML = "";
  // Retrieves element in the form
  var index = document.getElementById("indexTF").value;
  // XMLHTTP request -> server1.mjs
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../remove?index=" + index);
  xhr.send();
}

function clear_json() {
  // Retrieves container + refreshes it
  var container = document.getElementById("MAINSHOW");
  container.innerHTML = "";
  // XMLHTTP request -> server1.mjs
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../clear");
  xhr.send();
}

function restore_json() {
  // Retrieves container + refreshes it
  var container = document.getElementById("MAINSHOW");
  container.innerHTML = "";
  // XMLHTTP request -> server1.mjs
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../restore");
  xhr.send();
}
