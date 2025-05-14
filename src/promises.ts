// can we go typeof on promises and see whatr are they - or wht is thier closes prototype ? and the full protot[e chain?

console.log(typeof new Promise(() => {})); // "object"

let promise = new Promise(() => {});
console.log(Object.getPrototypeOf(promise)); // Promise.prototype
console.log(Object.getPrototypeOf(Promise.prototype)); // Object.prototype
console.log(Object.getPrototypeOf(Object.prototype)); // null


console.log(Object.getPrototypeOf(Object.prototype)); // null

// Breakdown of the Prototype Chain
// Instance Level → new Promise() inherits from Promise.prototype.

// Constructor Level → Promise.prototype inherits from Object.prototype.

// Root Level → Object.prototype is the top ancestor, and its prototype is null.

// Closest Prototype
// The closest prototype of a Promise instance is Promise.prototype, which provides methods like .then(), .catch(), and .finally().