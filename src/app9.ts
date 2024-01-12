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
  // if only one card in the deck or deck empty there can be no two or
  // more players so return false
  if (deck.length < 2) return false;
  const hash: { [key: number]: number } = {};

  //  create a hash that groups the same cards in the deck ex: deck=[1,2,2] - hash={1: 1, 2: 2}
  for (let i = 0; i < deck.length; i++) {
    hash[deck[i]] = (hash[deck[i]] ?? 0) + 1;
  }
  // make an array out of that hash, values = [1,2]
  let values = Object.values(hash);

  // for each entry in values create an array that counts all integers starting from 2
  // and equal the value. we setting up the ground for checking possible divisors of
  // that value, we dont want 1 as a divisor (since there are at leat tweo players)
  // so for values = [1,1] we will have tow arrays lenght 1, [2] and [2,3]
  const divisors = [];
  for (let i = 0; i < values.length; i++) {
    const arr = Array.from({ length: values[i] }, (v, i) => i + 2);
    const subDivisors = [];

    // now we iterate [2] and [2,3] respectively and see if those values are divisors
    // if they are push them into subDivisors and then divisors array
    // in our case they are not so divisors will have two  arrays, one empty pushed and
    // will look divisors = [[],2]]
    for (let j = 0; j < arr.length; j++) {
      if (values[i] % arr[j] === 0) {
        subDivisors.push(arr[j]);
      }
    }
    divisors.push(subDivisors);
  }

  // if deck=[1,1,1,1,1] meaning on type of card than divisors will only have one array
  // and we can be sure that it is not deck =[1] (because deck.length<2 return false) so
  // surley card can be divided between players
  if (divisors.length === 1) return true;

  // at this stage surly divisors.length=>2 for our deck=[1,2,2] we have divisors =[[],[2]]
  // 1. and the logic below first check common divisors of entry 0 and 1 in divisors
  // and creates new array 'common' with common divisors of those two entries:

  // since our example divisors = [[],[2]], left = -1, right =0 and the loop
  // below wont run, meaning there is no common divisors, so common will stay as empty array
  let left = divisors[0].length - 1;
  let right = divisors[1].length - 1;
  let common: number[] = [];

  while (left >= 0 && right >= 0) {
    console.log('here');
    if (divisors[0][left] === divisors[1][right]) {
      left--;
      right--;
    } else if (divisors[0][left] > divisors[1][right]) {
      left--;
    } else {
      right--;
    }
  }
  common.reverse();

  // 2. second part will pick up at index 2 in divisors array and try to find common divisors
  // between that array and common array (divisors that are already common for previous entries
  // in the divisors array) and then common array will be updated to new set of common divisors.
  for (let i = 2; i < divisors.length; i++) {
    let left = common.length - 1;
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
    common = tempCommon.reverse();
  }

  // when the loop above finishes and common is not empty it means that there are common divisors
  // so card can be divided between players.
  return common[common.length - 1] ? true : false;
}
console.log('hasGroupsSizeX', hasGroupsSizeX([1, 2, 2]));
