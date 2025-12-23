// Functions are reusable blocks of code
// used to perform a specific task when called.

// Normal function
function add(a, b) {
  return a + b;
}

console.log(add(5, 3));

// Arrow function
const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(4, 2));

// Anonymous function
const greet = function () {
  console.log("Hello from anonymous function");
};

greet();

// IIFE (Immediately Invoked Function Expression)
// This function runs immediately after it is defined
(function () {
  console.log("Hello from IIFE");
})();
