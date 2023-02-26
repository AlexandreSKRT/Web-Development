"use strict";

//Std class

export class Std {
    //Constructor
    constructor(lastName, firstName, id) {
        this.lastName = lastName;
        this.firstName = firstName; 
        this.id = id;
    }

    //Methods
    toString() {
        return "student: " + this.lastName + ", " + this.firstName + ", " + this.id;
    }

}