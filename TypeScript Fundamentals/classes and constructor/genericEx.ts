// Generics allow us to create reusable components
// that work with different data types safely


// with function
function identity<T>(value: T): T {
  return value
}

console.log(identity<number>(10))
console.log(identity<string>("Raj"))

// generic class example

class Box<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }
}

const numberBox = new Box<number>(100)
const stringBox = new Box<string>("Hello")

console.log(numberBox.getValue())
console.log(stringBox.getValue())
