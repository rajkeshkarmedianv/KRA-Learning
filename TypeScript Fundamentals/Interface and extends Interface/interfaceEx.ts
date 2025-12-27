// An interface is used to define the structure (shape) of an object.

interface User {
  name: string
  age: number
}

const user: User = {
  name: "Raj",
  age: 25
}

//Interface with function

interface Calculator {
  add(a: number, b: number): number
}

const calc: Calculator = {
  add: (x, y) => x + y
}



// Extending an interface means creating a new interface
// that inherits properties from another interface
// and can add new properties.

interface Person {
  name: string
}

interface Employee extends Person {
  empId: number
  department: string
}

const employee: Employee = {
  name: "Raj",
  empId: 101,
  department: "IT"
}
console.log(employee)


