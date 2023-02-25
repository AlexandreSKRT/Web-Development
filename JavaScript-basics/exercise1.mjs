"use strict";

// no recursion
export function fiboIt(n) {
    var fib0 = 0, fib1 = 1, fib2;
    switch (n) {
        case 0:
            return fib0;
        case 1:
            return fib1;
        default:
            for (var iter = 0; iter<n-1; iter++){
                fib2 = fib0 + fib1
                fib0 = fib1
                fib1 = fib2
            }
            return fib2
    }
}

// recursive programming
export function fiboRec(n) {
    if (n <= 1) {
        return n;
    } else {
        return fiboRec(n-1) + fiboRec(n-2);
    }
}

// no map function
export function fibonaArr(t) {}

// no loop
export function fibo_map(t) {}