// 139. Word Break

// Given a string s and a dictionary of strings wordDict, return true if s can be
// segmented into a space-separated sequence of one or more dictionary words.

// Note that the same word in the dictionary may be reused multiple times in the segmentation.

// Example 1:

// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
// Example 2:

// Input: s = "applepenapple", wordDict = ["apple","pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.
// Example 3:

// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false

// Constraints:

// 1 <= s.length <= 300
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 20
// s and wordDict[i] consist of only lowercase English letters.
// All the strings of wordDict are unique.

export function wordBreak(s: string, wordDict: string[]): boolean {
  let main: boolean = false;

  // this is how you stop a backctracking function:
  try {
    bactrack(0, []);
  } catch (e) {
    if (e === 'found') {
      main = true;
    } else {
      throw e;
    }
  }
  const memo = {};
  function bactrack(index: number, el2: string[]) {
    if (el2.join('') === s) {
      // originaly here i had main= true; return - nut this was stoping
      // only one branch
      throw 'found';
    }
    if (el2.join('').length > s.length) {
      return;
    }
    for (let j = 0; j < wordDict.length; j++) {
      if (el2.join('').length + wordDict[j].length > s.length) {
        continue;
      }
      if (
        el2.join('').length + wordDict[j].length === s.length &&
        el2.join('') + wordDict[j] !== s
      ) {
        continue;
      }
      el2.push(wordDict[j]);
      bactrack(0, el2);
      el2.pop();
    }
  }

  return main;
}

console.log('wordBreak', wordBreak('leetcode', ['leet', 'code']));
