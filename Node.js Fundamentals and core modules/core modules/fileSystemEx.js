const fs = require("fs")

// fs.writeFile write the data in file
fs.writeFile("data.txt", "Hello Node", (err) => {
  if (err) throw err;
  console.log("data added Successfully")
});

// fs.readfile read the data in file
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// added new line in file 
fs.appendFile("data.txt", "\nNew Line", () => {});

// delete the data from file 
fs.unlink("data.txt", () => {});



