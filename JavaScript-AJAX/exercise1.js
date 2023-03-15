"use strict";

function loadDoc() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "text.txt");
  xhr.onload = function () {
    var text_area = document.getElementById("texta");
    text_area.innerHTML = xhr.responseText;
  };
  xhr.send();
}