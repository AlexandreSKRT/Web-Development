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

export class FrStd extends Std {
    //Constructor 
    constructor(lastName, firstName, id, nationality) {
        super(lastName, firstName, id);
        this.nationality = nationality;
    }

    //Methods
    toString() {
        return super.toString() + ", " + this.nationality;
    }
}