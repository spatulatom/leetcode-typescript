// let obj: { property: number }= {property:6} // Error: Type 'null' is not assignable to type '{ property: number; }'
// console.log(obj.property);

// let userProfile: string | null=null;
// console.log(userProfile);

let sth;
sth = null;
sth = 6;
sth = 'hello';

console.log(sth);

let user = {
  name: 'John Doe',
  // address: {
  //   street: '123 Main St',
  //   city: 'Anytown',
  //   country: 'USA'
  // }
};

console.log(user.address?.city);

const nr=5;
console.log(isNaN(nr)); // false
console.log(isNaN("hello")); // true (because "hello" cannot be converted to a number)
console.log(isNaN("22")); // false (because "22" is converted to the number 22)
console.log(isNaN(22)); // false (correctly identifies 22 isn't NaN)
console.log(Number.isNaN("hello")); // false (correctly detects "hello" isn't a number)
console.log(Number.isNaN(NaN)); // true (correctly identifies NaN)
console.log(Number.isNaN('2')); // false (correctly identifies '2' isn't NaN)

// comparing object literal with Date object    
const date1 = new Date('2023-10-01');
console.log(date1); // 2023-10-01T00:00:00.000Z
console.log(user); // { name: 'John Doe' }