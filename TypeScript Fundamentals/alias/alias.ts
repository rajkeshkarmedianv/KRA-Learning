// A type alias is used to give a custom name (alias)
// to a type so it can be reused easily in the code

type UserId = number

let id: UserId = 101


// with object
type User = {
  name: string
  age: number
}

const user: User = {
  name: "Raj",
  age: 25
}

//with function 
type Add = (a: number, b: number) => number

const add: Add = (x, y) => x + y

// with union type
type Status = "success" | "error" | "loading"

let currentStatus: Status = "success"
console.log(currentStatus)
