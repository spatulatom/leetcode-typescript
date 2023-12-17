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


function insert(intervals: number[][], newInterval: number[]): number[][] {
    
};

console.log(insert, insert([[1,3],[6,9]], [2,5]))