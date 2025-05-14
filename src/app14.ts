// 1. Daily Coding Problem: Problem #991

// Good morning! Here's your coding interview problem for today.

// This problem was asked by Google.

// What will this code print out?

// def make_functions():
//     flist = []

//     for i in [1, 2, 3]:
//         def print_i():
//             print(i)
//         flist.append(print_i)

//     return flist

// functions = make_functions()
// for f in functions:
//     f()
// How can we make it print out what we apparently want?

// This problem was asked by Google.

// What will this code print out?

function makeFunctions() {
    const flist = [];
    
    for (let i = 1; i <= 3; i++) {
      function printI() {
        console.log(i);
      }
      flist.push(printI);
    }
    
    return flist;
  }
  
  const functions = makeFunctions();
  console.log('functions', functions);
  for (const f of functions) {
    f();
  }
  
  // 2. Daily Coding Problem: Problem #990 
//   Good morning! Here's your coding interview problem for today.

// This problem was asked by Amazon.

// There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, 
// write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

// For example, if N is 4, then there are 5 unique ways:

// 1, 1, 1, 1
// 2, 1, 1
// 1, 2, 1
// 1, 1, 2
// 2, 2
// What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of 
// positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.

function climbStairs(N: number, steps: number[]): number {
    const dp = new Array(N + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= N; i++) {
        for (const step of steps) {
            if (i - step >= 0) {
                dp[i] += dp[i - step];
            }
        }
    }

    return dp[N];
}

console.log('climbStairs', climbStairs(4, [1, 2])); // Output: 5

function tryingNull() {
    const a = {
        b: null,
        c: undefined,
    }

return a.b; // Error: Cannot read properties of null (reading 'm')
//     return a.c.m // Error: Cannot read properties of undefined (reading 'm')
}
console.log('tryingNull', tryingNull()); // Output: null