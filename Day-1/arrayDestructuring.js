//Array Destructuring

let num = [10,20,30]

let [a,b,c] = num
console.log(a,b,c)

// Array Spread 

let arr1 = [1,2,3]
let arr2 = [...arr1,4,5]
console.log(arr2)

//Array Rest
//Rest is used to collect the element in an Array

function sum(...num){
    let total = 0
    for(let ele of num){
        total+=ele
    }
    return total
}

console.log(sum(1,2,3,4))