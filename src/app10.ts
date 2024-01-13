// 819. Most Common Word
// Easy
// 1.6K
// 3K
// Companies
// Given a string paragraph and a string array of the banned words banned,
// return the most frequent word that is not banned. It is guaranteed there
// is at least one word that is not banned, and that the answer is unique.

// The words in paragraph are case-insensitive and the answer should be returned
// in lowercase.

// Example 1:

// Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.",
// banned = ["hit"]
// Output: "ball"
// Explanation:
// "hit" occurs 3 times, but it is a banned word.
// "ball" occurs twice (and no other word does), so it is the most frequent
//  non-banned word in the paragraph.
// Note that words in the paragraph are not case sensitive,
// that punctuation is ignored (even if adjacent to words, such as "ball,"),
// and that "hit" isn't the answer even though it occurs more because it is banned.
// Example 2:

// Input: paragraph = "a.", banned = []
// Output: "a"

// Constraints:

// 1 <= paragraph.length <= 1000
// paragraph consists of English letters, space ' ', or one of the symbols: "!?',;.".
// 0 <= banned.length <= 100
// 1 <= banned[i].length <= 10
// banned[i] consists of only lowercase English letters.


// sol 1, systematic approach, step 2 and 4 most expensive with time complexity O(n^m+kl log k)
// but since m is a constant representing symbols we have O(n +k log k), 
// where m are individual words in parahraph and k are symbols;
// space complexity: O(n)
function mostCommonWord(paragraph: string, banned: string[]): string {
//1. change paragraph to array arr
  const arr: string[] | string[][] = paragraph.split(' ');

// 2.remove comas and other symbols placed at the end of a string
  const symbols = "!?',;.";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < symbols.length; j++) {
      if (arr[i][arr[i].length - 1] === symbols[j]) {
        const word = arr[i].split('');
        word.pop();
        arr[i] = word.join('');
      }
    }
    // and convert to lowercase
    arr[i] = arr[i].toLocaleLowerCase();
  }

// 3.  remove comas placed inside a string for ex: 'a, a, a, a, b,b,b,c, c', banned ['a]
// expaected result: b. so b,b,b,c is not one string but comas have to be removed
// and 4 entries has to be added to the arr. Note that last coma after c has been 
// alredy removed earlier with other symbols at step 2
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(',')) {
      const arr2: any = arr[i].split(',').join('').split('');
      arr[i] = arr2;
    }
  }
  const newArr = arr.flat();

//   4. create a hash map counting entries in the array
  const hash: { [key: string]: number } = {};
  for (let i = 0; i < newArr.length; i++) {
    hash[newArr[i]] = (hash[newArr[i]] ?? 0) + 1;
  }

//   5. remove from hash banned entries
  if (banned[0]) {
    banned.forEach((e) => {
      delete hash[e.toLocaleLowerCase()];
    });
  }
 let max = -Infinity
  return Object.entries(hash).sort((a, b) => {
    return b[1] - a[1];
  })[0][0];
}

// console.log(
//   'mostCommonWord',
//   mostCommonWord('Bob hit a ball, the hit BALL flew far after it was hit.', [
//     'hit',
//   ])
// );
console.log('mostCommonWord', mostCommonWord('a, a, a, a, b,b,b,c, c', ['a']));

// Wrong Answer
// 47 / 48 testcases passed
// Editorial
// Input
// paragraph =
// "a, a, a, a, b,b,b,c, c"
// banned =
// ["a"]

// Use Testcase
// Output
// "b,b,b,c"
// Expected
// "b"
