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

