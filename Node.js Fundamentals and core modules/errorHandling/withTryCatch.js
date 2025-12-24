// with Callback
fs.readFile("file.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});



//try-catch (Sync & Async-Await)
try {
  const data = JSON.parse("{");
} catch (err) {
  console.log("Invalid JSON");
}

//Async-Await
try {
  const user = await User.findById(id);
} catch (err) {
  next(err);
}


// with Promise
Promise .catch()
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));