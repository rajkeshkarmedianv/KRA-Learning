//closures
// Closures is Mechanism in JS.Here the inner function allows to use and remember of outer function variables even after the outer function executed.

function outer(){
    let name = "Raj Keshkar"
    function inner(){
        console.log(name)
    }
    inner()
}
outer()