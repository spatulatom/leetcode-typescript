import { twoSum } from '../src/app';
it('should return the correct indices when the sum of two numbers in the array equals the target', () => {
  expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  expect(twoSum([3, 3], 6)).toEqual([0, 1]);
});

it('should return an empty array when the array contains only one element', () => {
  expect(twoSum([2], 2)).toEqual([]);
  expect(twoSum([-3], -3)).toEqual([]);
  expect(twoSum([0], 0)).toEqual([]);
});

import { merge } from '../src/app';

// 88. Merge Sorted Array
// merges two arrays with minimum length in non-decreasing order
it('should merge two arrays with minimum length in non-decreasing order', () => {
  const nums1 = [0];
  const m = 0;
  const nums2 = [1];
  const n = 1;

  merge(nums1, m, nums2, n);

  expect(nums1).toEqual([1]);
});

// 80. Remove Duplicates from Sorted Array
import { removeDuplicates } from '../src/app';
it('should keep the relative order of the elements the same when there are duplicates', () => {
  const nums = [1, 1, 1, 2, 2, 3];
  const expectedNums = [1, 1, 2, 2, 3];
  const k = removeDuplicates(nums);
  expect(k).toBe(expectedNums.length);
  for (let i = 0; i < k; i++) {
    expect(nums[i]).toBe(expectedNums[i]);
  }
});

//  11. Container With Most Water
import { maxArea } from '../src/app';
it('should return the correct maximum area for an input with heights at the maximum allowed value', () => {
  const height = [
    Math.pow(10, 4),
    Math.pow(10, 4),
    Math.pow(10, 4),
    Math.pow(10, 4),
    Math.pow(10, 4),
  ];
  expect(maxArea(height)).toBe(Math.pow(10, 4) * 4);
});

it('should return 0 for an input with all heights equal to 0', () => {
  const height = [0, 0, 0, 0, 0];
  expect(maxArea(height)).toBe(0);
});

it('should return the correct maximum area for an input with all heights equal to 1', () => {
  const height = [1, 1, 1, 1, 1];
  expect(maxArea(height)).toBe(4);
});

// 55. Jump Game
import { canJump } from '../src/app';
it('should return true when given an array with a single element', () => {
  const nums = [5];
  const result = canJump(nums);
  expect(result).toBe(true);
});
it('should return false when given an empty array', () => {
  const nums: any = [];
  const result = canJump(nums);
  expect(result).toBe(false);
});
it('should return true when given an array with multiple elements and the last index is reachable with the minimum number of jumps', () => {
  const nums = [2, 1, 1, 1, 1];
  const result = canJump(nums);
  expect(result).toBe(true);
});

it('should return false when given an array with multiple elements and it is not possible to reach the last index', () => {
  const nums = [3, 2, 1, 0, 4];
  const result = canJump(nums);
  expect(result).toBe(false);
});
