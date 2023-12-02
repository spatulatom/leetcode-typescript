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
    arr = flatt;
    flatt = [];

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

// 2723. Add Two Promises
// Easy
// 182
// 15
// Companies
// Given two promises promise1 and promise2, return a new promise. promise1 and
// promise2 will both resolve with a number. The returned promise should resolve with the sum
// of the two numbers.

// Example 1:

// Input:
// promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),
// promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
// Output: 7
// Explanation: The two input promises resolve with the values of 2 and 5 respectively.
// The returned promise should resolve with a value of 2 + 5 = 7. The time the returned
// promise resolves is not judged for this problem.
// Example 2:

// Input:
// promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50)),
// promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))
// Output: -2
// Explanation: The two input promises resolve with the values of 10 and -12 respectively.
// The returned promise should resolve with a value of 10 + -12 = -2.

// Constraints:

// promise1 and promise2 are promises that resolve with a number

type P = Promise<number>;

async function addTwoPromises(promise1: P, promise2: P): P {
  const one = await promise1;
  const two = await promise2;
  return new Promise((resolve) => resolve(one + two));
}

// console.log(
//   'addTwoPromises',
//   addTwoPromises(
//     new Promise((resolve) => setTimeout(() => resolve(2), 20)),
//     new Promise((resolve) => setTimeout(() => resolve(5), 60))
//   ).then(console.log)
// );

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */

// 2665. Counter II
// Easy
// 583
// 17
// Companies
// Write a function createCounter. It should accept an initial integer init.
// It should return an object with three functions.

// The three functions are:

// increment() increases the current value by 1 and then returns it.
// decrement() reduces the current value by 1 and then returns it.
// reset() sets the current value to init and then returns it.

// Example 1:

// Input: init = 5, calls = ["increment","reset","decrement"]
// Output: [6,5,4]
// Explanation:
// const counter = createCounter(5);
// counter.increment(); // 6
// counter.reset(); // 5
// counter.decrement(); // 4
// Example 2:

// Input: init = 0, calls = ["increment","increment","decrement","reset","reset"]
// Output: [1,2,1,0,0]
// Explanation:
// const counter = createCounter(0);
// counter.increment(); // 1
// counter.increment(); // 2
// counter.decrement(); // 1
// counter.reset(); // 0
// counter.reset(); // 0

// Constraints:

// -1000 <= init <= 1000
// 0 <= calls.length <= 1000
// calls[i] is one of "increment", "decrement" and "reset"

type ReturnObj = {
  increment: () => number;
  decrement: () => number;
  reset: () => number;
};

function createCounter(init: number): ReturnObj {
  let count = init;
  const obj = {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => {
      count = init;
      return count;
    },
  };

  return obj;
}
const counter = createCounter(2);
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.reset());
console.log(counter.increment());

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */


// 2695. Array Wrapper
// Easy
// 196
// 29
// Companies
// Create a class ArrayWrapper that accepts an array of integers in its constructor. 
// This class should have two features:

// When two instances of this class are added together with the + operator, the resulting 
// value is the sum of all the elements in both arrays.
// When the String() function is called on the instance, it will return a comma separated 
// string surrounded by brackets. For example, [1,2,3].
 

// Example 1:

// Input: nums = [[1,2],[3,4]], operation = "Add"
// Output: 10
// Explanation:
// const obj1 = new ArrayWrapper([1,2]);
// const obj2 = new ArrayWrapper([3,4]);
// obj1 + obj2; // 10
// Example 2:

// Input: nums = [[23,98,42,70]], operation = "String"
// Output: "[23,98,42,70]"
// Explanation:
// const obj = new ArrayWrapper([23,98,42,70]);
// String(obj); // "[23,98,42,70]"
// Example 3:

// Input: nums = [[],[]], operation = "Add"
// Output: 0
// Explanation:
// const obj1 = new ArrayWrapper([]);
// const obj2 = new ArrayWrapper([]);
// obj1 + obj2; // 0
 

// Constraints:

// 0 <= nums.length <= 1000
// 0 <= nums[i] <= 1000
// Note: nums is the array passed to the constructor


// sol 1
// we are overriding default methods exosting on every object
// - he valueOf method is called automatically when an object is used in a context
//  where a primitive value is expected, such as in arithmetic operations
// - toString is called when String(obj)
class ArrayWrapper {
    nums: number[]
	constructor(nums: number[]) {
        this.nums = nums
        
    }

	valueOf(): number {
        let sum = 0
        this.nums.forEach(e=>sum+=e)
        return sum
    }

	toString(): string {
        let string = `[${this.nums}]`
        // this.nums.flat(Infinity)
        // this.nums.forEach(e=> string+=e)
        return string
    }
};
const obj1 = new ArrayWrapper([1,22]);
console.log(obj1.toString())

// Notes: 
// When you use an array in a string context (like in a template literal), 
// JavaScript automatically converts the array to a string by joining its elements 
// with commas. This is equivalent to calling the array’s join method with a comma as 
// the argument. The square brackets [] are not included in the string 
// representation of an array.

// Here’s an example:

// JavaScript
// AI-generated code. Review and use carefully. More info on FAQ.

// const arr = [1, 2, 3];
// console.log(`${arr}`);  // Output: "1,2,3"
// console.log(arr.join(','));  // Output: "1,2,3"

/**
 * const obj1 = new ArrayWrapper([1,2]);
 * const obj2 = new ArrayWrapper([3,4]);
 * obj1 + obj2; // 10
 * String(obj1); // "[1,2]"
 * String(obj2); // "[3,4]"
 */
