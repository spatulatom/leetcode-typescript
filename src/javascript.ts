// 2618. Check if Object Instance of Class
// Medium
// 247
// 94
// Companies
// Write a function that checks if a given value is an instance of a given class or 
// superclass. For this problem, an object is considered an instance of a given class if 
// that object has access to that class's methods.

// There are no constraints on the data types that can be passed to the function. For 
// example, the value or the class could be undefined.

 

// Example 1:

// Input: func = () => checkIfInstanceOf(new Date(), Date)
// Output: true
// Explanation: The object returned by the Date constructor is, by definition, an instance of 
// Date.

// sol 1
function checkIfInstanceOf1(obj: any, classFunction:any):boolean {
    if (obj === null || typeof classFunction !== 'function') {
        console.log('type')
        return false;
    }

    let proto = Object.getPrototypeOf(obj);
    console.log('proto', proto, 'OBJ')

    while (proto !== null) {
        if (proto === classFunction.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }

    return false;
}


// sol 2

function checkIfInstanceOf(obj: any, classFunction:any):boolean {
    // == will check for null and undifined
    if (obj == null) {
        
        return false;
    }
    if (classFunction==null|| classFunction.prototype===undefined) {
        
        return false;
    }

    let proto = Object.getPrototypeOf(obj);

    while (proto !== null) {
        if (proto === classFunction.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }

    return false;
}

console.log('checkIfInstanceOf', checkIfInstanceOf(new Date(), Date))

// comments
class Person {
    private name: string;
    private age: string
    constructor(name: string, age:string) {
      this.name = name;
      this.age = age;
    }
  
    greet() {
      return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
  }

 const person = new Person('John', '21')
 const person2 = new Person('Jahne', '22')
 const proto = Object.getPrototypeOf(person)
 const proto2 = Object.getPrototypeOf(person2)

//  console.log('check',proto, proto === Person.prototype)
// console.log(Person.prototype)
// console.log('person',person, proto === proto2, typeof person2==='function')

// const x = 5
// console.log(x.prototype)

