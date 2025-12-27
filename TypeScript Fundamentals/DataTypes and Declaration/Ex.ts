//String

let name:String = "Raj"
console.log(name)

//Number

let age:Number = 25
console.log(age)

//boolean
let success:Boolean = true
console.log(success)



// Any : Any DataTypes will Allowed here 

let value:any = 25
console.log(value)

//void :no return value used for function that do not return anything

function fun():void{
    console.log("Raj")
}
fun()

//unknown : dont know the type yet,must check the type first

let data:unknown = "Raj"
data = 10
if(typeof data === "string"){
    data.toLocaleLowerCase
    console.log(data)
}

//null : represent no value

let data1:null = null
console.log(data1)

// undefine: value not assigned yet

let data2:undefined = undefined
console.log(data2)

//Never: never is a TypeScript type that represents something that will never happen.

function throwError(message: string): never {
  throw new Error(message);
}
throwError("Raj")
