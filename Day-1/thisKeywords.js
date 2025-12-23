// this keywords - this refers to the object that is currently calling the function.

let user = {
  name: "Raj",
  greet: function () {
    console.log(this.name)
  }
}

user.greet()

// in Normal Function 

function show() {
  console.log(this)
}

show()

// In Arrow function 

let obj = {
  age: 22,
  showAge: () => {
    console.log(this.age)
  }
}

obj.showAge()



