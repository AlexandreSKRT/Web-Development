"use strict";

function send() {    
    var xhr = new XMLHttpRequest();
    
    var input = document.getElementById("textedit").value;
    var uri = "chat.php?phrase=" + input;

    xhr.open("GET", uri);
    xhr.send();

    xhr.onload = function(){
        alert(xhr.responseText);
        alert(xhr.response);
    }
}
