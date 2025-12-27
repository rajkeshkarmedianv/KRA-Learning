
//  Number-only object

let numbersObj: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5
};
console.log(numbersObj)


// String-only object

let namesObj: { [key: string]: string } = {
  first: "Raj",
  second: "Soumen",
  third: "Rishi"
};
console.log(namesObj)


// 3. Union Type

type ID = number | string

let userObj: { userId: ID } = {
  userId: "A101"
};
console.log(userObj)


// Union Type in Object

type Value = number | string;

let valuesObj: { [key: string]: Value } = {
  first: 1,
  second: "two",
  third: 3,
  fourth: "four"
};
console.log(valuesObj)


//Intersection Type

type Person = {
  name: string
};

type Employee = {
  empId: number
};

type Staff = Person & Employee


//Intersection Type in Object

const staffObj: { [key: string]: Staff } = {
  staff1: { name: "Raj", empId: 101 },
  staff2: { name: "Amit", empId: 102 }
};
console.log(staffObj)
