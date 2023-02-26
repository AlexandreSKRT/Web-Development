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

export class WordL {
    // Constructor
    constructor (str) {
        this.str = str;
        this.text_split = str.split(" ");
        this.words_counted = wc(str);
    }

    // Methods
    getWords() {
        let uniqueWords = [... new Set(this.text_split)];
        uniqueWords.sort();
        return uniqueWords;
    }    

    maxCountWord() {
        var arr = Object.values(this.words_counted);
        var max = Math.max(...arr);
        var results = [];
        for (var [key, value] of Object.entries(this.words_counted)) {
            console.log(`${key}: ${value}`);
            if (value === max) {
                results.push(key);
            }
          }
        results.sort();
        return results[0];
        
    }
}