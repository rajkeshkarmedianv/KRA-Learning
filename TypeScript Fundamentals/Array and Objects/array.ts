//it allows only number
let number:Number[] = [1,2,3,4,5]
console.log(number)

//it allows only string
let name:String[] = ["Raj","soumen","Rishi"]
console.log(name)

//types union: A union type allows a value to be one of multiple types.

type ID = number | string;

let userId: ID
userId = 101
userId = "A101"

type Value = number | string

let values: Value[] = [1, "two", 3, "four"]
console.log(values)

//intersection:An intersection type combines multiple types into one.

type Person = { name: string };
type Employee = { empId: number };

type Staff = Person & Employee

const staff: Staff[] = [
  { name: "Raj", empId: 101 },
  { name: "Amit", empId: 102 }
]
console.log(staff)


