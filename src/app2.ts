// 409. Longest Palindrome
// Easy
// 5.1K
// 337
// Companies
// Given a string s which consists of lowercase or uppercase letters, return the
// length of the longest palindrome that can be built with those letters.

// Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

// Example 1:

// Input: s = "abccccdd"
// Output: 7
// Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
// Example 2:

// Input: s = "a"
// Output: 1
// Explanation: The longest palindrome that can be built is "a", whose length is 1.

// Constraints:

// 1 <= s.length <= 2000
// s consists of lowercase and/or uppercase English letters only.

function longestPalindrome(s: string): number {
  type hash = {
    [key: string]: number;
  };
  const hash: hash = {};

  for (let i = 0; i < s.length; i++) {
    hash[s[i]] = (hash[s[i]] ?? 0) + 1;
  }
  const arr = Object.values(hash);
  let sum = 0;
  let odd = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sum += arr[i];
    } else {
      sum += arr[i] - 1;
      odd = 1;
    }
  }

  return sum + odd;
}

console.log('longestPalindrome', longestPalindrome('abccccdd'));

// 3. Longest Substring Without Repeating Characters
// Medium
// 38K
// 1.7K
// Companies
// Given a string s, find the length of the longest
// substring
//  without repeating characters.

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

// Constraints:

// 0 <= s.length <= 5 * 104
// s consists of English letters, digits, symbols and spaces.

// sol 1, brute force
function lengthOfLongestSubstring(s: string): number {
  const allSubs = [];

  for (let i = 0; i < s.length - 1; i++) {
    const sub = [];
    sub.push(s[i]);
    for (let j = i + 1; j < s.length; j++) {
      if (sub.includes(s[j])) break;
      sub.push(s[j]);
    }
    allSubs.push(sub.length);
  }
  let max = 0;
  allSubs.forEach((e) => (max = Math.max(max, e)));
  return s.length === 1 ? 1 : max;
}

console.log('lengthOfLongestSubstring', lengthOfLongestSubstring(' '));
