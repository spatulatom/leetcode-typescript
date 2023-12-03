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

export function isSubsequence(s: string, t: string): boolean {
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

// 283. Move Zeroes

function moveZeroes(nums: number[]): void {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
    }
  }
}

console.log('moveZeroes', moveZeroes([0, 1, 0, 3, 12]));

// 5. Longest Palindromic Substring
// Medium
// 28.1K
// 1.7K
// Companies
// Given a string s, return the longest
// palindromic

// substring
//  in s.

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:

// Input: s = "cbbd"
// Output: "bb"

// Constraints:

// 1 <= s.length <= 1000
// s consist of only digits and English letters.

// sol 1 O(n^2) ant space complexity O(n^2)
// 1. brute force palindromeof even length
// 2. brute force palindrome of odd length
function longestPalindrome(s: string): string {
  const all = [];
  // if(s.length===2&&s[0]!==s[1]) return s[0]
  for (let i = 1; i < s.length - 1; i++) {
    const sub = [];
    sub.push(s[i]);
    let left = i - 1;
    let right = i + 1;
    while (left >= 0 || right <= s.length - 1) {
      if (s[left] === s[right]) {
        sub.push(s[right]);
        sub.unshift(s[left]);
      } else {
        left = 0;
      }

      left--;
      right++;
    }
    if (sub.length > 1) all.push(sub);
  }

  for (let i = 1; i < s.length; i++) {
    const sub2 = [];

    let left1 = i - 1;
    let right1 = i;
    while (left1 >= 0 || right1 <= s.length - 1) {
      if (s[left1] === s[right1]) {
        sub2.push(s[right1]);
        sub2.unshift(s[left1]);
      } else {
        left1 = 0;
        right1 = s.length;
      }

      left1--;
      right1++;
    }

    if (sub2.length > 1) all.push(sub2);
  }
  let longest = { len: 0, index: 0 };
  all.forEach((e, i) => {
    if (e.length > longest.len) {
      longest.len = e.length;
      longest.index = i;
    }
  });

  return all.length === 0 && s.length > 0 ? s[0] : all[longest.index].join('');
}
console.log('longestPalindrome', longestPalindrome('abcda'));

// sol 2
// Instead of using arrays (sub and all) to store substrings, you 
// can keep track of the start and end indices of the longest palindrome 
// found so far.

function longestPalindrome2(s:string) {
  if (s.length === 0) return '';

  let longestStart = 0;
  let longestEnd = 0;

  for (let i = 0; i < s.length; i++) {
    // Check for odd-length palindromes
    let left = i;
    let right = i;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    if (right - left - 1 > longestEnd - longestStart) {
      longestStart = left + 1;
      longestEnd = right - 1;
    }

    // Check for even-length palindromes
    left = i;
    right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    if (right - left - 1 > longestEnd - longestStart) {
      longestStart = left + 1;
      longestEnd = right - 1;
    }
  }

  return s.substring(longestStart, longestEnd + 1);
}



