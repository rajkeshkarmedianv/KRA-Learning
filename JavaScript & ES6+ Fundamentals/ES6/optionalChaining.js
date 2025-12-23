// optional Chaning - Optional chaining safely accesses nested properties without causing errors if a value is null or undefined.

let user = {
  name: "Raj",
  address: {
    city: "Ahmedabad"
  }
}

console.log(user.address?.city)
console.log(user.contact?.phone)
