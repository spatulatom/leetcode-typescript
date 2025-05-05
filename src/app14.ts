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
  
  // How can we make it print out what we apparently want?