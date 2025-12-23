// object Destructuring

let user = {
    name:"Raj",
    age:22,
    city:"Ahmedabad"
}

let {name,age,city} = user
console.log(name,age,city)

// Spread Operator

let obj1 = {x:1,y:2}
let obj2 = {...obj1,z:3}
console.log(obj2)