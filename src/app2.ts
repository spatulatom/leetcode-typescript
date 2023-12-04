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
