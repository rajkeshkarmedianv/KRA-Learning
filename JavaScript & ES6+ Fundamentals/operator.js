// Arithmetic Operators
let a = 10
let b = 3

console.log(a + b)
console.log(a - b)
console.log(a * b)
console.log(a / b)
console.log(a % b)
console.log(a ** b)

// Assignment Operators
let x = 5
x += 2
x -= 1
x *= 3
console.log("Assignment:", x)

// Comparison Operators
console.log("Comparison:")
console.log(5 == "5")
console.log(5 === "5")
console.log(5 != 6)
console.log(5 > 3)
console.log(5 <= 5)

// Logical Operators
let isAdult = true
let hasId = false

console.log("Logical:")
console.log(isAdult && hasId)
console.log(isAdult || hasId)
console.log(!isAdult)

// Unary Operators
let n = 10
n++
n--
console.log("Unary:", n)
console.log(typeof n)

// Ternary Operator
let age = 20
let status = age >= 18 ? "Adult" : "Minor"
console.log("Ternary:", status)

// String Operator
let firstName = "Raj"
let lastName = "Keshkar"
console.log("String:", firstName + " " + lastName)

// Nullish & Logical OR
let value = null
console.log(value ?? "Default Value")
console.log(value || "Fallback")
