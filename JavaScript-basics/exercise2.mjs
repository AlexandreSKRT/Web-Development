"use strict";

//WordCount wc function
export function wc(text) {
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

//Class WordL

export function WordL(text) {
    this.text = text;
}

WordL.prototype.getWords = function(text){
    var results = {};
    var text_split = text.split(" ");
    var uniqueWords = [...new Set(text_split)];
    uniqueWords.sort();
    return uniqueWords;

}