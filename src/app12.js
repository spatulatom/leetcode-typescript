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
