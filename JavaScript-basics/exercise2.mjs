"use strict";

export function wc(text){
    var results = {};
    var text_split = text.split(" ");
    for (let word of text_split) {
        if (results[word]) {
            results[word]++;
        } else {
            results[word] = 1;
        }
    }
    return results;
}