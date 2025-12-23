// Array Methods

// ForEach - ForEach is a Higher Order Function it is excution a function on every element in array.

let num = [1,2,3,4,5,6]

let forEachEx = num.forEach((ele)=>{
    console.log(ele)
})
console.log(forEachEx)

// Map - Map is a Higher Order Function it return an array and an excecute every element in an array.

let mapEx = num.map((ele)=> {
    return (ele)
})
console.log(mapEx)

// filter - filter is a higher order function it returns an array which element pass the condition.

let filterEx = num.filter((ele)=>{
    return ele%2===0

})
console.log(filterEx)

// reduce - reduce is also a higher order function it reduce the array in sungle value.

let reduceEx = num.reduce((acc,ele)=>{
    return acc+ele

},0)
console.log(reduceEx)