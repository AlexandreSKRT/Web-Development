"use strict";

import {fiboIt,fiboRec,fibonaArr,fibo_map} from "./exercise1.mjs";


console.log("Fibonnaci sequence iteratively :")
for (var iter=0; iter<16; iter++){
    console.log("iteration " + iter + " : " + fiboIt(iter));
}

console.log(" ");

console.log("Fibonnaci sequence recusively :")
for (var iter=0; iter<16; iter++){
    console.log("iteration " + iter + " : " + fiboRec(iter));
}

console.log(" ");

console.log("Fibonnaci on arrays withous using map :")
console.log(fibonaArr(Array.from(Array(16).keys())));

console.log(" ");

console.log("Fibonnaci on arrays using map :");
console.log(fibo_map(Array.from(Array(16).keys())));