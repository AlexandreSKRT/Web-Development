"use strict"; 

function show_text(){
    var container = document.getElementById("container");
    container.innerHTML = "";
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", "../../show"); 
    xhr.onload = function() {
        container.textContent = this.responseText;
    }
    xhr.send();
}