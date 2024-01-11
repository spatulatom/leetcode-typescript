// 914. X of a Kind in a Deck of Cards
// Easy
// 1.8K
// 480
// Companies
// You are given an integer array deck where deck[i] represents the number
// written on the ith card.

// Partition the cards into one or more groups such that:

// Each group has exactly x cards where x > 1, and
// All the cards in one group have the same integer written on them.
// Return true if such partition is possible, or false otherwise.

// Example 1:

// Input: deck = [1,2,3,4,4,3,2,1]
// Output: true
// Explanation: Possible partition [1,1],[2,2],[3,3],[4,4].
// Example 2:

// Input: deck = [1,1,1,2,2,2,3,3]
// Output: false
// Explanation: No possible partition.

// Constraints:

// 1 <= deck.length <= 104
// 0 <= deck[i] < 104

// sol 1, time complexity O(n^2) (or O(m * sqrt(m))?).
function hasGroupsSizeX(deck: number[]): boolean {
  if (deck.length < 2) return false;
  const hash: { [key: number]: number } = {};
  for (let i = 0; i < deck.length; i++) {
    hash[deck[i]] = (hash[deck[i]] ?? 0) + 1;
  }

  let values = Object.values(hash);
 
  const divisors = [];
  for (let i = 0; i < values.length; i++) {
    const arr = Array.from({ length: values[i] }, (v, i) => i+2);
    const subDivisors = [];
    for (let j = 0; j < arr.length; j++) {
      if (values[i] % arr[j] === 0) {
        subDivisors.push(arr[j]);
        // console.log(arr[j]);
      }
    }
    divisors.push(subDivisors);
  }
if(divisors.length===1) return true
  //   create an array of common divisors for entry 0 and 1 of divisors array
  let left = divisors[0].length - 1;
  let right = divisors[1].length - 1;
  let common:any = [];
  
  while (left >= 0 && right >= 0) {
    if (divisors[0][left] === divisors[1][right]) {
      common.push(divisors[0][left]);
      left--;
      right--;
    } else if (divisors[0][left] > divisors[1][right]) {
      left--;
    } else {
      right--;
    }
  }
 common.reverse()
  for (let i = 2; i < divisors.length; i++) {

    let left: any = common.length - 1;
    let right = divisors[i].length - 1;
    const tempCommon = [];
    while (left >= 0 && right >= 0) {
      if (common[left] === divisors[i][right]) {
        tempCommon.push(common[left]);
        left--;
        right--;
      } else if (common[left] > divisors[i][right]) {
        left--;
      } else {
        right--;
      }
    }
    common = tempCommon.reverse()
    // console.log('temp', common, tempCommon);
  }

//   return [values, 'max:', max, divisors, 'common', common];
  return common[common.length-1]?true:false
}
console.log(
  'hasGroupsSizeX',
  hasGroupsSizeX([1,1])
);
