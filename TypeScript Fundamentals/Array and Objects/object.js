"use strict";
//  Number-only object
Object.defineProperty(exports, "__esModule", { value: true });
let numbersObj = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5
};
console.log(numbersObj);
// String-only object
let namesObj = {
    first: "Raj",
    second: "Soumen",
    third: "Rishi"
};
console.log(namesObj);
let userObj = {
    userId: "A101"
};
console.log(userObj);
let valuesObj = {
    first: 1,
    second: "two",
    third: 3,
    fourth: "four"
};
console.log(valuesObj);
//Intersection Type in Object
const staffObj = {
    staff1: { name: "Raj", empId: 101 },
    staff2: { name: "Amit", empId: 102 }
};
console.log(staffObj);
//# sourceMappingURL=object.js.map