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

function mostCommonWord(paragraph: string, banned: string[]): string {
  const arr = paragraph.split(' ')
  const symbols = "!?',;.";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < symbols.length; j++) {
    //   console.log('here', arr[i][arr[i].length-1],)
      if (arr[i][arr[i].length - 1] === symbols[j]) {
        // console.log('here', arr[i][arr[i].length - 1]);
        const word = arr[i].split('');
        word.pop();
        arr[i] = word.join('');
      }
    }
    arr[i] = arr[i].toLocaleLowerCase();
  }
  const hash: { [key: string]: number } = {};
  for (let i = 0; i < arr.length; i++) {
    hash[arr[i]] = (hash[arr[i]] ?? 0) + 1;
  }

if(banned[0]){
    banned.forEach(e=>{
        delete hash[e.toLocaleLowerCase()]
    })
   
}
// return hash
  return Object.entries(hash).sort((a, b) => {
    return b[1] - a[1];
  })[0][0];
}

console.log(
  'mostCommonWord',
  mostCommonWord("a, a, a, a, b,b,b,c, c", ["a"])
);

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
