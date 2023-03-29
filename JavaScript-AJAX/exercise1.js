"use strict";

function loadDoc() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "text.txt");
  xhr.onload = function () {
    var text_area = document.getElementById("texta");
    text_area.innerHTML = this.responseText;
  };
  xhr.send();
}

function loadDoc2() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "text.txt");
  xhr.onload = function () {
    var text_area2 = document.getElementById("texta2");
    var text_lines = this.responseText.split("<br/>");
    for (var index in text_lines) {
      var p = document.createElement("p");
      p.innerHTML = text_lines[index];
      p.style.color =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
          .toUpperCase();
      text_area2.appendChild(p);
    }
  };
  xhr.send();
}
