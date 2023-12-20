// 56. Merge Intervals
// Medium

// Given an array of intervals where intervals[i] = [starti, endi], merge
// all overlapping intervals, and return an array of the non-overlapping intervals that
// cover all the intervals in the input.

// Example 1:

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
// Example 2:

// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

// Constraints:

// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

// sol 1, time complexity O(n log m), space O(1) - don’t use any additional space
export function merge56(intervals: number[][]): number[][] {
  intervals.sort((a, b) => {
    return a[0] - b[0];
  });

  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] >= intervals[i + 1][0]) {
      if (intervals[i][1] > intervals[i + 1][1]) {
        intervals[i + 1] = [intervals[i][0], intervals[i][1]];
      } else {
        intervals[i + 1] = [intervals[i][0], intervals[i + 1][1]];
      }

      intervals[i] = [0];
    }
  }

  for (let i = intervals.length - 1; i >= 0; i--) {
    if (intervals[i].length === 1) intervals.splice(i, 1);
  }
  return intervals;
}
console.log(
  'merge',
  merge56([
    [1, 4],
    [0, 2],
    [3, 5],
  ])
);

// 57. Insert Interval
// Medium
// You are given an array of non-overlapping intervals intervals where
// intervals[i] = [starti, endi] represent the start and the end of the ith interval and
// intervals is sorted in ascending order by starti. You are also given an interval
// newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending
// order by starti and intervals still does not have any overlapping intervals
// (merge overlapping intervals if necessary).

// Return intervals after the insertion.

//  Example 1:
// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
// Example 2:

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

// Constraints:

// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 105
// intervals is sorted by starti in ascending order.
// newInterval.length == 2
// 0 <= start <= end <= 105

// sol 1, time O(n), space O(n)
export function insert(
  intervals: number[][],
  newInterval: number[]
): number[][] {
  if (intervals.length === 0) return [newInterval];
  let flag = false;
  const temp = [];
  for (let i = 0; i < intervals.length; i++) {
    temp.push(intervals[i][0] + intervals[i][1]);
    if (
      intervals[i][0] <= newInterval[0] &&
      intervals[i][1] >= newInterval[0]
      // interval [2,8] newInterval [3,10]
    ) {
      intervals[i] = [
        intervals[i][0],
        Math.max(newInterval[1], intervals[i][1]),
      ];
      flag = true;
    } else if (
      intervals[i][0] > newInterval[0] &&
      intervals[i][0] <= newInterval[1]
    ) {
      // [[1, 3],[6, 9],], newInterval [2, 5] so it wont insert [6,9] but would [5,9]
      intervals[i] = [
        newInterval[0],
        Math.max(newInterval[1], intervals[i][1]),
      ];
      flag = true;
    }
  }

  // If the current interval overlaps with the new interval, you merge them by updating the
  // current interval’s start and end times to
  //  the merged interval’s start and end times.
  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] >= intervals[i + 1][0]) {
      if (intervals[i][1] > intervals[i + 1][1]) {
        intervals[i + 1] = [intervals[i][0], intervals[i][1]];
      } else {
        intervals[i + 1] = [intervals[i][0], intervals[i + 1][1]];
      }

      intervals[i] = [0];
    }
  }

  // remove all intervals that were marked for deletion.
  for (let i = intervals.length - 1; i >= 0; i--) {
    if (intervals[i].length === 1) intervals.splice(i, 1);
  }

  // If the new interval was not merged with any existing interval, you find the correct position
  // to insert it and add it to the intervals array.
  if (!flag) {
    const sum = newInterval[0] + newInterval[1];
    let index = intervals.length;
    for (let i = 0; i < temp.length; i++) {
      if (sum < temp[i]) {
        index = i;
        break;
      }
    }
    intervals.splice(index, 0, newInterval);
  }

  return intervals;
}

console.log(
  'insert',
  insert(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5]
  )
);

// 139. Word Break
// Medium
// 16.5K
// 724
// Companies
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

// sol 1, bactracking, exceeds time
function wordBreak1(s: string, wordDict: string[]): boolean {
  // if(s==="aaaaaaa") return true

  let main: string[][] = [];

  bactrack(0, '', []);

  function bactrack(index: number, el: string, el2: string[]) {
    // console.log('hi', el2.join('').length, s.length);
    if (el2.join('').length === 9) {
      // console.log(el2.join(''))
    }
    if (el2.join('') === s) {
      // console.log('herer', el2.join(''));
      main.push([...el2]);
      return;
    }
    if (el2.join('').length > s.length) {
      // console.log('hereeee', el2.join('').length, s.length)
      return;
    }
    for (let j = 0; j < wordDict.length; j++) {
      el2.push(wordDict[j]);
      // console.log(wordDict[j], el2.join(''))
      bactrack(0, '', el2);
      el2.pop();
    }
  }

  return main.length === 0 ? false : true;
}

// sol 2, optimiza sol 1
function wordBreak(s: string, wordDict: string[]): boolean {
  // if(s==="aaaaaaa") return true

  let main: boolean = false;

  bactrack(0, []);

  function bactrack(index: number, el2: string[]) {
    console.log('hi', el2.join(''), s.length);

    if (el2.join('') === s) {
      // console.log('herer', el2.join(''));
      main = true;
      return;
    }
    if (el2.join('').length > s.length) {
      // console.log('hereeee', el2.join('').length, s.length)
      return;
    }
    for (let j = 0; j < wordDict.length; j++) {
      if (el2.join('').length + wordDict[j].length > s.length) {
        continue;
      }
      // console.log(wordDict[j], 'equal', el2.join('')+wordDict[j], el2.join('')+wordDict[j]!==s)
      if (
        el2.join('').length + wordDict[j].length === s.length &&
        el2.join('') + wordDict[j] !== s
      ) {
        continue;
      }
      el2.push(wordDict[j]);
      // console.log(wordDict[j], el2.join(''))
      bactrack(0, el2);
      el2.pop();
    }
  }

  return main;
}

// console.log('wordBreak', wordBreak('leetcode', ['leet', 'code']));

// sol 3, memoization
function wordBreak2(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const memo = new Array(s.length + 1).fill(-1);
  memo[s.length] = true;


  function backtrack(start: number): boolean {
    if (memo[start] !== -1) {
      return memo[start];
    }
    for (let end = start + 1; end <= s.length; end++) {
      if (wordSet.has(s.slice(start, end)) && backtrack(end)) {
        memo[start] = true;
        return true;
      }
    }
    memo[start] = false;
    return false;
  }

  return backtrack(0);
}
console.log('wordBreak2', wordBreak2('leetcode', ['leet', 'code']));
