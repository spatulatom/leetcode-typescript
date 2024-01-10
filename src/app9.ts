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

function hasGroupsSizeX(deck: number[]): boolean {
  if (deck.length < 2) return false;
  const hash: { [key: number]: number } = {};
  for (let i = 0; i < deck.length; i++) {
    hash[deck[i]] = (hash[deck[i]] ?? 0) + 1;
  }

  const values = Object.values(hash);
  //   find max
  let max = -Infinity;
  for (let i = 0; i < values.length; i++) {
    max = Math.max(max, values[i]);
  }
return [hash, 'max:', max]

// find greatest common divisor (that will be equal with maximun number of players): gtd
// - gtd must be between var max and each number for ex: 8 nad 4
// gtd is 4 (there can be maximum 4 players each holding 3 cards, but
// there can also be 2 players each holding 6 cards but at his stage
// we need only maximun  number of players and gcd will help us achieve that)

// so now we will look for gcd between max and each number, say we have
// max = 8, and numbers are [8, 2, 4]
// 1. max and 8, gcd =8
// 2. max and 2, gcd = 2
// 3. max and 4, now we can not go higher than 2, so we need to check if
// 2 might be gcd, it can becuse 4%2===0. Lets assume that 2 would not be gcd and 
// if we go under 2, do we need to backtrack and see if our new gcd is also good 
// for previous numbers?

for(let i=0; i<values.length;i++){

}
  return true;
}
console.log(
  'hasGroupsSizeX',
  hasGroupsSizeX([0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3])
);
