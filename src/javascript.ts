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
function checkIfInstanceOf1(obj: any, classFunction: any): boolean {
  if (obj === null || typeof classFunction !== 'function') {
    console.log('type');
    return false;
  }

  let proto = Object.getPrototypeOf(obj);
  console.log('proto', proto, 'OBJ');

  while (proto !== null) {
    if (proto === classFunction.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

// sol 2

export function checkIfInstanceOf(obj: any, classFunction: any): boolean {
  // == will check for null and undifined
  if (obj == null) {
    return false;
  }
  if (classFunction == null || classFunction.prototype === undefined) {
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

console.log('checkIfInstanceOf', checkIfInstanceOf(new Date(), Date));

// comments
class Person {
  private name: string;
  private age: string;
  constructor(name: string, age: string) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

const person = new Person('John', '21');
const person2 = new Person('Jahne', '22');
const proto = Object.getPrototypeOf(person);
const proto2 = Object.getPrototypeOf(person2);

//  console.log('check',proto, proto === Person.prototype)
// console.log(Person.prototype)
// console.log('person',person, proto === proto2, typeof person2==='function')

// const x = 5
// console.log(x.prototype)

// 2625. Flatten Deeply Nested Array
// Medium
// 266
// 16
// Companies
// Given a multi-dimensional array arr and a depth n, return a flattened
// version of that array.

// A multi-dimensional array is a recursive data structure that contains
// integers or other multi-dimensional arrays.

// A flattened array is a version of that array with some or all of the
// sub-arrays removed and replaced with the actual elements in that sub-array.
// This flattening operation should only be done if the current depth of
// nesting is less than n. The depth of the elements in the first array are
// considered to be 0.

// Please solve it without the built-in Array.flat method.

// Example 1:

// Input
// arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
// n = 0
// Output
// [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

// Explanation
// Passing a depth of n=0 will always result in the original array.
// This is because the smallest possible depth of a subarray (0) is not
// less than n=0. Thus, no subarray should be flattened.
// Example 2:

// Input
// arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
// n = 1
// Output
// [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

// Explanation
// The subarrays starting with 4, 7, and 13 are all flattened. This is
// because their depth of 0 is less than 1. However [9, 10, 11] remains
// unflattened because its depth is 1.
// Example 3:

// Input
// arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
// n = 2
// Output
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

// Explanation
// The maximum depth of any subarray is 1. Thus, all of them are flattened.

// Constraints:

// 0 <= count of numbers in arr <= 105
// 0 <= count of subarrays in arr <= 105
// maxDepth <= 1000
// -1000 <= each number <= 1000
// 0 <= n <= 1000

type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (
  arr: MultiDimensionalArray,
  n: number
): MultiDimensionalArray {
  let flatt: MultiDimensionalArray = [];
  recursion(n);

  function recursion(n: number) {
    if (n === 0) return arr;


    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        console.log(arr[i]);
        flatt.push(...(arr[i] as MultiDimensionalArray));
      } else {
        flatt.push(arr[i]);
      }
    }
    arr= flatt;
    flatt =[]

    return recursion(n - 1);
  }

  return arr;
};

console.log(
  'flat',
  flat(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, [9, 10, 11], 12],
      [13, 14, 15],
    ],
    0
  )
);
