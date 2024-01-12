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

// sol 1
// The problem 914 can be seen as finding GDC but that is only once there are 
// two types of cards in the deck. If there is type of card in the deck, like deck=[2,2,2,2,2]
// then we only need to check for divisors > 1.
// But even when there is more types of cards in the deck we can check for common divisors (CD)
// not necessrly greates common divisor (GTC).  If common divisors exist that means that cards
// can be divided evenly.


function hasGroupsSizeX(deck: number[]): boolean {
  // if only one card in the deck or deck is empty there can't be two or
  // more players so return false
  if (deck.length < 2) return false;
  const hash: { [key: number]: number } = {};

  //  create a hash that groups the same cards in the deck ex: deck=[1,2,2] - hash={1: 1, 2: 2}
  for (let i = 0; i < deck.length; i++) {
    hash[deck[i]] = (hash[deck[i]] ?? 0) + 1;
  }
  // make an array out of that hash, values = [1,2]
  let values = Object.values(hash);

//  1. checking for divisors of every type of card.
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

//   2. Checking for common divisors.
  // at this stage surly divisors.length=>2 for our deck=[1,2,2] we have divisors =[[],[2]]
  // a) and the logic below first checks common divisors of entry 0 and 1 in divisors
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
  // b) second part will pick up at index 2 in divisors array and try to find common divisors
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
console.log('hasGroupsSizeX', hasGroupsSizeX([1,2,3,4,4,3,2,1]));
console.log('hasGroupsSizeX', hasGroupsSizeX1([1,2,3,4,4,3,2,1]));




// ### Time Complexity:
// 1. **Building the Hash Map (`hash`):** This operation takes O(n), where n is the 
// number of elements in the `deck`.

// 2. **Finding Divisors (`divisors` array):** For each unique count in the `hash`
// map, you find its divisors. Suppose 
// the maximum count is m. The worst-case time complexity for finding divisors 
// could be considered O(m * sqrt(m)) because, in the worst case, you check divisors 
// up to the square root of m.

// 3. **Finding Common Divisors (`common` array):** You iterate through the `divisors` 
// array multiple times, each time checking for common divisors. Let's say there 
// are k unique counts. In the worst case, you might compare the divisors k times. 
// If the maximum count is m, this step could be considered O(k * m).

// Combining these steps, your overall time complexity could be expressed as 
// O(n + m * sqrt(m) + k * m). In the worst case, the most significant factor is 
// likely the finding divisors step (O(m * sqrt(m)).

// ### Space Complexity:
// 1. **Hash Map (`hash`):** O(n) space is used to store the counts of each element 
// in the `deck`.

// 2. **Subdivisors Array (`subDivisors`):** O(m * sqrt(m)) space is used in 
// the worst case, where m is the maximum count. This is because, for each count, 
// you may store up to sqrt(m) divisors.

// 3. **Divisors Array (`divisors`):** O(m * sqrt(m)) space is used for storing 
// the divisors for each count in the `hash`.

// 4. **Array of Integers (`arr`):** O(m) space is used in the worst case to 
// store integers starting from 2 up to the maximum count.

// 5. **Common Array (`common`):** O(k * m) space is used in the worst case for 
// storing common divisors.

// Overall, the space complexity is dominated by the divisors and common arrays. 
// Therefore, the overall space complexity could be expressed as O(n + m * sqrt(m) + k * m).

// Keep in mind that these are worst-case complexities, and the actual performance 
// may vary based on the characteristics of the input data.

// no comments version
function hasGroupsSizeX1(deck: number[]): boolean {
    if (deck.length < 2) return false;
    const hash: { [key: number]: number } = {};
    for (let i = 0; i < deck.length; i++) {
      hash[deck[i]] = (hash[deck[i]] ?? 0) + 1;
    }
  
    let values = Object.values(hash);
  
    const divisors = [];
    for (let i = 0; i < values.length; i++) {
      const arr = Array.from({ length: values[i] }, (v, i) => i + 2);
      const subDivisors = [];
      for (let j = 0; j < arr.length; j++) {
        if (values[i] % arr[j] === 0) {
          subDivisors.push(arr[j]);
        }
      }
      divisors.push(subDivisors);
    }
    if (divisors.length === 1) return true;
  
    let left = divisors[0].length - 1;
    let right = divisors[1].length - 1;
    let common: number[] = [];
  
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
    common.reverse();
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
  
    return common[common.length - 1] ? true : false;
  }