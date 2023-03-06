"use strict";

import {
    Std,
    FrStd
} from "./exercise3.mjs";

import fs from 'fs'
import {readFileSync, writeFileSync} from 'fs'

export class Prmtn {
    //Constructor
    constructor() {
        this.promotion = [];
    }

    //Methods   
    add(student) {
        this.promotion.push(student);
    }

    size() {
        return this.promotion.length; 
    }

    get(i) {
        return this.promotion[i];
    }

    print() {
        for (let i=0; i<this.promotion.length; i++){
            console.log(this.get(i).toString());
        }
        return; 
    }

    write() {
        return JSON.stringify(this.promotion);
    }

    read(str) {
        var json_parsed = JSON.parse(str);
        this.promotion = [];
        for (let i=0; i<json_parsed.length; i++){
            let elt = json_parsed[i];
            if ('nationality' in elt) {
                var student = new FrStd(elt.lastName, elt.firstName, elt.id, elt.nationality);
            } else {
                var student = new Std(elt.lastName, elt.firstName, elt.id);
            }
            this.promotion.push(student);
        }
        return;
    }

    write(fileName) {
        let data = this.write; 
        const fs = require('fs');
        fs.writeFileSync('Output.txt', data, (err) => {
            if (err) throw err;
        })
    }

    saveTo(fileName){
        fs.writeFile(fileName, this.write(), function (err, data) {
            if (err) console.log(err);
          });
    }

    readFrom(fileName){
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            this.read(data.toString())
        })
    }
}