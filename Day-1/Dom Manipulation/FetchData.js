async function fetchData(){
    let res = await fetch("https://jsonplaceholder.typicode.com/todos")
    let data = await res.json()
    console.log(data)

}
fetchData()