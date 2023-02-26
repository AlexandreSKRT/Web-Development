"use strict";

import {wc, WordL} from "./exercise2.mjs";

// Wc function test
console.log("**** wc function *****")
console.log("Test for : \"fish bowl fish bowl fish\"");
console.log(wc("fish bowl fish bowl fish"));

console.log(" ");

// WordL class
console.log("**** WordL class *****");
var test = new WordL("fish bowl fish plane robot robot fish plane plane");
console.log("-- Test getWords --");
console.log(test.getWords());
console.log("-- Test maxCountWord --");
console.log("max occurences : " + test.maxCountWord());
