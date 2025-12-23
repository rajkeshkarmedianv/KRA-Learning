// Async Programming - Async programming allows JavaScript to perform long-running tasks (like API calls or file operations) without blocking the main thread.

console.log(1)
console.log(2)
setTimeout(()=>{
    console.log(3)
},100)
console.log(4)

// closure - closures is a mechanism in js where it takes the function in our argument and excutes in some time.it is use for async programming.

function greet(name,callback){
    console.log(`Hello ${name}`)
    callback()
}

function welcome(){
    console.log("welcome to Medianv")
}

greet("Raj Keshkar",welcome)

// promise - A Promise is an object that represents the eventual result of an asynchronous operation, either success or failure.

function PromiseEx(){
    let success = true
    return Promise((res,rej)=>{
        if(success){
            res("Promise Resolve")
        }
        else{
            rej("Promise Rejected")
        }
        

    })
}
PromiseEx()
.then((res)=>console.log(res))
.catch((err)=>console.log(err))


// Async-Await : async and await are used to handle asynchronous operations in a clean and readable way, making async code look like synchronous code.


async function fetchData() {
  try {
    let success = true

    if (!success) {
      throw "Something went wrong"
    }

    return "Data fetched successfully"
  } catch (error) {
    console.log("Error:", error)
  }
}


fetchData().then(result => console.log(result))

