// 392. Is Subsequence

// Given two strings s and t, return true if s is a subsequence of t,
// or false otherwise.

// A subsequence of a string is a new string that is formed from the original
// string by deleting some (can be none) of the characters without disturbing
// the relative positions of the remaining characters. (i.e., "ace" is a
//  subsequence of "abcde" while "aec" is not).

// Example 1:
// Input: s = "abc", t = "ahbgdc"
// Output: true

// Example 2:
// Input: s = "axc", t = "ahbgdc"
// Output: false

// Constraints:

// 0 <= s.length <= 100
// 0 <= t.length <= 104
// s and t consist only of lowercase English letters.

// Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where
// k >= 109, and you want to check one by one to see if t has its subsequence.
// In this scenario, how would you change your code?

// sol 1, with indexOf method, On*m
function isSubsequence1(s: string, t: string): boolean {
  let indexes: string[] = [];
  for (let i = 0; i < t.length; i++) {
    if (s.indexOf(t[i]) !== -1) {
      indexes.push(t[i]);
    }
  }
  if (indexes.length > s.length) {
    for (let i = 0; i < s.length; i++) {
      while (s[i] !== indexes[i]) {
        if (indexes.length < s.length) return false;
        indexes.splice(i, 1);
      }
    }
  }

  return indexes.join('').includes(s);
}

// sol 2, O(n)

function isSubsequence(s: string, t: string): boolean {
    if (s.length === 0) {
      // An empty string is always a subsequence of any string
      return true;
    }
  
    let sIndex = 0;
  
    for (let i = 0; i < t.length; i++) {
      if (s[sIndex] === t[i]) {
        sIndex++;
      }
  
      if (sIndex === s.length) {
        // All characters of s have been found in t in order
        return true;
      }
    }
  
    // Not all characters of s were found in t in order
    return false;
  }
  



console.log('isSubsequence', isSubsequence('ab', 'babb'));
