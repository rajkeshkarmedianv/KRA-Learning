"use strict";
// Modifiers control who can access class properties and methods
// They define the visibility of class members
Object.defineProperty(exports, "__esModule", { value: true });
// Public
class Person {
    name;
    constructor(name) {
        this.name = name;
    }
}
const p = new Person("Raj");
console.log(p.name); // allowed
// Private
class BankAccount {
    balance;
    constructor(balance) {
        this.balance = balance;
    }
    getBalance() {
        return this.balance; // allowed inside class
    }
}
const acc = new BankAccount(1000);
// console.log(acc.balance) not allowed
console.log(acc.getBalance()); // allowed
//Protected
class Employee {
    salary;
    constructor(salary) {
        this.salary = salary;
    }
}
class Manager extends Employee {
    showSalary() {
        console.log(this.salary); // allowed in child class
    }
}
//# sourceMappingURL=modifierEx.js.map