"use strict";

function send() {    
    var xhr = new XMLHttpRequest();

    // Input uri
    var input = document.getElementById("textedit").value;
    var uri = "chat.php?phrase=" + input;

    xhr.open("GET", uri);
    // [TESTING] : success || failure
    xhr.onload = function(){
        // alert(xhr.response);
    }
    xhr.send();
}


function reload() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "chatlog.txt");
    xhr.send();

    xhr.onload = function(){
        // Retrieve text from "chatlog.txt"
        var text_area = document.getElementById("texta");
        var text_splitted = this.responseText.split("\n").reverse();

        // Remove all child elements 
        text_area.innerHTML = ""; 

        // Add each line of text_splitted
        for (let i=0; i<11; i++){
            if (text_splitted[i] == ""){
                continue;
            } else {
                var p = document.createElement("p");
                p.textContent = text_splitted[i];
                text_area.appendChild(p);
            }
        }
    }

    xhr.send();
}

setInterval(reload, 1000);