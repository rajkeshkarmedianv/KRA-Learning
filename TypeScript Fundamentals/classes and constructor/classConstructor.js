"use strict";
// A class is a blueprint or template used to create objects
Object.defineProperty(exports, "__esModule", { value: true });
class Student {
    // Properties define the data of the object
    name;
    age;
    // A constructor is a special method
    // It runs automatically when an object is created using 'new'
    constructor(name, age) {
        this.name = name; // 'this' refers to the current object
        this.age = age;
    }
    // Method: function inside a class
    introduce() {
        console.log("My name is " + this.name + " and my age is " + this.age);
    }
}
const student1 = new Student("Raj", 25);
const student2 = new Student("Amit", 23);
console.log(student1.name);
console.log(student2.age);
student1.introduce();
student2.introduce();
//# sourceMappingURL=classConstructor.js.map