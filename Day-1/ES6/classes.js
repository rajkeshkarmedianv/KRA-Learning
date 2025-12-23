//classes - Classes are blueprints used to create objects with properties and methods.

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`)
  }
}

const user = new Person("Raj", 22)
user.greet()
