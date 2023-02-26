"use strict";

import {
    Std,
    FrStd
} from "./exercise3.mjs";

var student = new Std("Dupond", "John", 1835);
var student_fr = new FrStd("Dupond", "John", 1835, "American");

console.log("-- Test toString; parent --");
console.log(student.toString());

console.log("-- Test toString; child --");
console.log(student_fr.toString());