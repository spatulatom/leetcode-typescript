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

// 76. Minimum Window Substring
// Hard
// 16.6K
// 677
// Companies
// Given two strings s and t of lengths m and n respectively, return the minimum window
// substring
//  of s such that every character in t (including duplicates) is included in the window.
//  If there is no such substring, return the empty string "".

// The testcases will be generated such that the answer is unique.

// Example 1:

// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
// Example 2:

// Input: s = "a", t = "a"
// Output: "a"
// Explanation: The entire string s is the minimum window.
// Example 3:

// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.

// Constraints:

// m == s.length
// n == t.length
// 1 <= m, n <= 105
// s and t consist of uppercase and lowercase English letters.

// Follow up: Could you find an algorithm that runs in O(m + n) time?

// sol 1, brute, time exceeds at 265/267
function minWindow1(s: string, t: string): string {
  const hash: { [key: string]: number } = {};
  for (let i = 0; i < t.length; i++) {
    hash[t[i]] = (hash[t[i]] ?? 0) + 1;
  }

  const allRanges = new Set();
  for (let i = 0; i < s.length; i++) {
    const range = [];
    const copy = { ...hash };
    let right = i;
    let counter = 0;

    while (right <= s.length - 1) {
      if (copy[s[right]]) {
        range.push(right);
        copy[s[right]]--;

        if (!copy[s[right]]) delete copy[s[right]];
        right++;
      } else {
        right++;
      }
      if (Object.keys(copy).length === 0) {
        let endIndex = range[range.length - 1] + 2;

        if (range.length === 1) allRanges.add(s[range[0]]);
        allRanges.add(s.substring(range[0], endIndex - 1));

        break;
      }
    }
  }

  const setIntoArr: any[] = [...allRanges];
  let min = { len: +Infinity, index: 0 };

  setIntoArr.forEach((e: any, i) => {
    if (e.length < min.len) {
      min.len = e.length;
      min.index = i;
    }
  });

  return setIntoArr.length === 0 ? '' : setIntoArr[min.index];
}

// sol 2 , optimized, still time exceeds at 265/267

function minWindow(s: string, t: string): string {
  const hash: { [key: string]: number } = {};
  for (let i = 0; i < t.length; i++) {
    hash[t[i]] = (hash[t[i]] ?? 0) + 1;
  }

  const allRanges: any = [];
  for (let i = 0; i < s.length; i++) {
    const range = [];
    const copy = { ...hash };
    let right = i;
    let counter = 0;

    while (right <= s.length - 1) {
      if (copy[s[right]]) {
        range.push(right);
        copy[s[right]]--;
        counter++;
        if (!copy[s[right]]) delete copy[s[right]];
      }
      right++;
      if (counter === t.length) {
        let endIndex = range[range.length - 1] + 2;

        if (range.length === 1) allRanges[s[range[0]]];
        if (allRanges[0]) {
          if (
            allRanges[0].length > s.substring(range[0], endIndex - 1).length
          ) {
            allRanges[0] = s.substring(range[0], endIndex - 1);
          }
        } else {
          allRanges[0] = s.substring(range[0], endIndex - 1);
        }

        break;
      }
    }
  }

  return allRanges.length > 0 ? allRanges[0] : '';
}

console.log('minWindow', minWindow('abc', 'ab'));
