// 229. Majority Element II
import { majorityElement1 } from '../src/app8';

it('should return an array with the majority element when it appears more than n/3 times', () => {
  const nums = [1, 2, 2, 3, 3, 3];
  const result = majorityElement1(nums);
  expect(result).toEqual([3]);
});

it('should return an empty array when the input array is empty', () => {
  const nums: number[] = [];
  const result = majorityElement1(nums);
  expect(result).toEqual([]);
});

it('should return an array with one element when the input array has only one element and it appears more than n/3 times', () => {
  const nums = [1];
  const result = majorityElement1(nums);
  expect(result).toEqual([1]);
});

// 300. Longest Increasing Subsequence
import { lengthOfLIS } from '../src/app8';

it('should return the correct length of the longest increasing subsequence', () => {
  const nums = [10, 9, 2, 5, 3, 7, 101, 18];
  const result = lengthOfLIS(nums);
  expect(result).toBe(4);
});

it('should return 1 when given an array with all elements equal to 0', () => {
  const nums = [0, 0, 0, 0, 0];
  const result = lengthOfLIS(nums);
  expect(result).toBe(1);
});

it('should return 1 when given an empty array', () => {
  const nums: any = [];
  const result = lengthOfLIS(nums);
  expect(result).toBe(1);
});

it('should return the correct length when given an array with some elements in increasing order and some in decreasing order', () => {
  const nums = [3, 4, 2, 8, 1, 5, 6];
  const result = lengthOfLIS(nums);
  expect(result).toBe(4);
});

