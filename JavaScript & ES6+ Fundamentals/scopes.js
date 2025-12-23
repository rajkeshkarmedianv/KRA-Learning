// function scoped -Function scope means variables declared inside a function are accessible only within that function and not outside of it.

function sum(a,b){
    console.log(a+b)
}
sum(5,9)

// block scope -Block scope means variables declared with let and const are accessible only within the block {} in which they are defined.

if (true) {
  let x = 10
  const y = 20
  console.log(x)
  console.log(y)
}

console.log(x)
console.log(y)

// Lexical Scope - Lexical scope means a function can access variables from its outer (parent) scope where it is defined, not where it is called.

function outer() {
  let name = "Raj"

  function inner() {
    console.log(name)
  }

  inner()
}

outer()

