// Modifiers control who can access class properties and methods
// They define the visibility of class members

// Public
class Person {
  public name: string

  constructor(name: string) {
    this.name = name
  }
}

const p = new Person("Raj")
console.log(p.name) // allowed

// Private

class BankAccount {
  private balance: number

  constructor(balance: number) {
    this.balance = balance
  }

  getBalance() {
    return this.balance // allowed inside class
  }
}

const acc = new BankAccount(1000)
// console.log(acc.balance) not allowed
console.log(acc.getBalance()) // allowed

//Protected


class Employee {
  protected salary: number

  constructor(salary: number) {
    this.salary = salary
  }
}

class Manager extends Employee {
  showSalary() {
    console.log(this.salary) // allowed in child class
  }
}



