"use strict";

import {
    Prmtn
} from "./exercise4.mjs"

import {
    Std,
    FrStd
} from "./exercise3.mjs"

var promo2024 = new Prmtn();

//Adding students

var student1 = new Std("Dupond", "John", 1835);
var student2 = new Std("Hamson", "Eric", 1585);
var student3 = new Std("Woods", "Diana", 1435);
var student_fr1 = new FrStd("Smith", "Andrew", 7536, "Scottish");
var student_fr2 = new FrStd("Duval", "Pierre", 5874, "French");
var student_fr3 = new FrStd("Piarizzi", "Julia", 1452, "Italian");

promo2024.add(student1);
promo2024.add(student2);
promo2024.add(student3);

promo2024.add(student_fr1);
promo2024.add(student_fr2);
promo2024.add(student_fr3);

var data = '[{"lastName":"Dupond","firstName":"John","id":1835},{"lastName":"Hamson","firstName":"Eric","id":1585},{"lastName":"Woods","firstName":"Diana","id":1435},{"lastName":"Smith","firstName":"Andrew","id":7536,"nationality":"Scottish"},{"lastName":"Duval","firstName":"Pierre","id":5874,"nationality":"French"},{"lastName":"Piarizzi","firstName":"Julia","id":1452,"nationality":"Italian"}]';
console.log("***************** Test with manually added students *****************");
console.log("-- Test size() --");
console.log("Size of the promotion : " + promo2024.size());

console.log("-- Test get(i) --");
console.log("Get 3rd student : " + promo2024.get(2));

console.log("-- Test print() --");
console.log(promo2024.print());

console.log("-- Test write() --");
console.log(promo2024.write());

console.log("***************** Test with students from JSON *****************");
console.log("-- Test read() --");
//Read json str
console.log(promo2024.read(data));

console.log("-- Test size() --");
console.log("Size of the promotion : " + promo2024.size());

console.log("-- Test get(i) --");
console.log("Get 3rd student : " + promo2024.get(2));

console.log("-- Test print() --");
console.log(promo2024.print());

console.log("-- Test write() --");
console.log(promo2024.write());
