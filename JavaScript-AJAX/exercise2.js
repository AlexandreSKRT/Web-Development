"use strict";

function send() {
    window.alert('start');
    
    var xhr = new XMLHttpRequest();
    var input = document.getElementById("textedit").value;

    var uri = "chat.php?phrase=" + input;
    window.alert(uri);

    xhr.open("GET", uri);
    window.alert(xhr.responseText);
    window.alert(xhr.responseType);

    xhr.send();
    window.alert('end');
}
