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


function longestPalindromeBruteForce(s: string): number {
  const isPalindrome = (str: string): boolean => {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  let maxLength = 0;

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const substr = s.slice(i, j + 1);
      if (isPalindrome(substr)) {
        maxLength = Math.max(maxLength, substr.length);
      }
    }
  }

  return maxLength;
}


console.log('longestPalindromeBruteForce', longestPalindromeBruteForce('abccccdd'));
export function longestPalindrome(s: string): number {
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

// 42. Trapping Rain Water
// Hard
// 29.9K
// 436
// Companies
// Given n non-negative integers representing an elevation map where the width of
// each bar is 1, compute how much water it can trap after raining.

//  Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array
// [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are
// being trapped.
// Example 2:

// Input: height = [4,2,0,3,2,5]
// Output: 9

// Constraints:

// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

// sol 0, two pointers

function trap(height: number[]): number {
  if (height.length === 0) {
    return 0;
  }

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let result = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      // Update leftMax and calculate trapped water on the left
      leftMax = Math.max(leftMax, height[left]);
      result += Math.max(0, leftMax - height[left]);
      left++;
    } else {
      // Update rightMax and calculate trapped water on the right
      rightMax = Math.max(rightMax, height[right]);
      result += Math.max(0, rightMax - height[right]);
      right--;
    }
  }

  return result;
}

// console.log('trap', trap([0,1,0,2,1,0,1,3,2,1,2,1]));
console.log(
  'trap',
  trap([
    6, 4, 2, 0, 3, 2, 0, 3, 1, 4, 5, 3, 2, 7, 5, 3, 0, 1, 2, 1, 3, 4, 6, 8, 1,
    3,
  ])
);
console.log('trap', trap([4, 2, 0, 3, 2, 5]));

// sol 1, not working
function trap1(height: number[]): number {
  let units = 0;
  let wait = 1;
  for (let i = 0; i < height.length - 1; i++) {
    let end = i;
    for (let k = i + 1; k < height.length; k++) {
      if (height[k] >= height[i]) {
        end = k;
        // console.log('ennnn', i, height[end]);
        break;
      } else if (height[k] < height[i] && k === height.length - 1) {
        end = k;
      }
    }
    if (i >= wait) {
      wait = i + 1;
    }
    if (wait === i + 1) {
      console.log('ennnn', i, height[end]);
      let pointer = end - 1;
      if (end === height.length - 1) {
        console.log('runs', height[end], height[i]);
        // while (pointer >= i + 1) {
        //   units = units + (height[end] - height[pointer]);
        //   console.log('whileeeee')
        //   pointer--;
        // }
        // break
      } else {
        for (let j = i + 1; j <= end; j++) {
          //   console.log('second', height[end]);

          if (height[i] > height[j]) {
            //   console.log('i', i, height[i], 'j', j, height[j]);
            units = units + (height[i] - height[j]);
          }
          if (j === end) {
            // console.log('here')
            wait = j;
          }
        }
      }
    }
  }

  if (!units) {
    console.log('REVERSE');
    const reverse = height.reverse();
    let wait2 = 1;
    for (let i = 0; i < reverse.length - 1; i++) {
      let end = i;
      for (let k = i + 1; k < reverse.length; k++) {
        if (reverse[k] >= reverse[i]) {
          end = k;
          break;
        }
      }
      if (i >= wait2) {
        wait2 = i + 1;
      }
      if (wait2 === i + 1) {
        for (let j = i + 1; j <= end; j++) {
          if (reverse[i] > reverse[j]) {
            //   console.log('i', i, reverse[i], 'j', j, reverse[j]);
            units = units + (reverse[i] - reverse[j]);
          }
          if (j === end) {
            //   console.log('here')
            wait2 = j;
          }
        }
      }
    }
  }

  return units;
}

// sol 2, not working

function trap2(height: number[]): number {
  // const height = heigh.reverse()
  let units = 0;
  let wait = 1;
  const jumps: any = {};
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      if (height[j] > height[i]) {
        if (j === i + 1) break;
        // console.log('units1',i,j,j-i, units)
        let pointer = j - 1;
        while (pointer > i) {
          units = units + height[i] - height[pointer];
          // console.log('here','i:',  height[i],  'j:',height[j], 'units:', units);
          pointer--;
        }

        i = j - 1;
        console.log('ni', i);
        let m = i;
        jumps[j] = height[j];
        break;
      }
    }
  }
  // reverse
  const reverse = height.reverse();
  const jumps2: any = {};
  for (let i = 0; i < reverse.length; i++) {
    console.log('HERRRRRR', i);
    for (let j = i; j < reverse.length; j++) {
      if (reverse[j] > reverse[i]) {
        if (j === i + 1) break;
        // console.log('units1',i,j,j-i, units)
        // let left = j-1
        // while(left>i){
        //     if(reverse[left]<reverse[i])
        // }
        let pointer = j - 1;
        while (pointer > i) {
          units = units + reverse[i] - reverse[pointer];
          console.log(
            'here',
            'i:',
            i,
            height[i],
            'j:',
            j,
            height[j],
            'units:',
            units
          );
          pointer--;
        }

        i = reverse.length;

        let m = i;
        jumps2[j] = height[j];
        break;
      }
    }
  }

  return units;
}
