"use strict";
// Generics allow us to create reusable components
// that work with different data types safely
Object.defineProperty(exports, "__esModule", { value: true });
// with function
function identity(value) {
    return value;
}
console.log(identity(10));
console.log(identity("Raj"));
// generic class example
class Box {
    value;
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
const numberBox = new Box(100);
const stringBox = new Box("Hello");
console.log(numberBox.getValue());
console.log(stringBox.getValue());
//# sourceMappingURL=genericEx.js.map