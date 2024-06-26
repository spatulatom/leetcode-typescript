// 29. Divide Two Integers
import { divide1 } from '../src/app3';

it('should return the correct quotient when dividend and divisor are positive', () => {
  expect(divide1(10, 3)).toBe(3);
  expect(divide1(15, 5)).toBe(3);
  expect(divide1(20, 4)).toBe(5);
});

it('should return 2147483647 when dividend is -2147483648 and divisor is -1', () => {
  expect(divide1(-2147483648, -1)).toBe(2147483647);
});

it('should return the correct quotient when dividend is positive and divisor is negative', () => {
  expect(divide1(10, -3)).toBe(-3);
  expect(divide1(15, -5)).toBe(-3);
  expect(divide1(20, -4)).toBe(-5);
});

it('should return the correct quotient when dividend is negative and divisor is positive', () => {
  expect(divide1(-10, 3)).toBe(-3);
  expect(divide1(-15, 5)).toBe(-3);
  expect(divide1(-20, 4)).toBe(-5);
});
it('should return the correct quotient when dividend and divisor are negative', () => {
  expect(divide1(-10, -3)).toBe(3);
  expect(divide1(-15, -5)).toBe(3);
  expect(divide1(-20, -4)).toBe(5);
});
it('should return 0 when dividend is 0', () => {
  expect(divide1(0, 3)).toBe(0);
  expect(divide1(0, -5)).toBe(0);
  expect(divide1(0, 1)).toBe(0);
});

//   152. Maximum Product Subarray
import { maxProduct1 } from '../src/app3';

it('should return the correct maximum product when the input is [2,3,-2,4]', () => {
  expect(maxProduct1([2, 3, -2, 4])).toBe(6);
});

it('should return 0 when the input contains zeros', () => {
  expect(maxProduct1([2, 0, -3, 4])).toBe(4);
});

it('should return the single element when the input contains only one element', () => {
  expect(maxProduct1([5])).toBe(5);
});
it('should return the correct maximum product when the input is [-2,-3,-4,-5]', () => {
  expect(maxProduct1([-2, -3, -4, -5])).toBe(120);
});
it('should return the correct maximum product when the input is [-2,3,-4,5]', () => {
  expect(maxProduct1([-2, 3, -4, 5])).toBe(120);
});
it('should return the correct maximum product when the input is [1]', () => {
  expect(maxProduct1([1])).toBe(1);
});

//   238. Product of Array Except Self
import { productExceptSelf } from '../src/app3';
it('should return the correct output when given a basic input', () => {
  const nums = [1, 2, 3, 4];
  const expected = [24, 12, 8, 6];
  const result = productExceptSelf(nums);
  expect(result).toEqual(expected);
});
it('should return an empty array when given an empty input', () => {
  const nums: any = [];
  const expected: any = [];
  const result = productExceptSelf(nums);
  expect(result).toEqual(expected);
});

it('should return an array of 1s with the same length as the input array', () => {
  const nums = [1, 1, 1, 1];
  const expected = [1, 1, 1, 1];
  const result = productExceptSelf(nums);
  expect(result).toEqual(expected);
});

// 53. Maximum Subarray
import { maxSubArray1 } from '../src/app3';

it('should return the correct maximum subarray sum when the array contains positive and negative integers', () => {
  const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  const result = maxSubArray1(nums);
  expect(result).toBe(6);
});

it('should return -Infinity when the array is empty', () => {
  const nums: number[] = [];
  const result = maxSubArray1(nums);
  expect(result).toBe(-Infinity);
});

it('should return the correct maximum subarray sum when the array has length 1', () => {
  const nums = [5];
  const result = maxSubArray1(nums);
  expect(result).toBe(5);
});
it('should return the correct maximum subarray sum when the array contains all negative integers', () => {
  const nums = [-1, -2, -3, -4, -5];
  const result = maxSubArray1(nums);
  expect(result).toBe(-1);
});

it('should return the correct maximum subarray sum for an array of length 2', () => {
  const nums = [1, -2];
  const result = maxSubArray1(nums);
  expect(result).toBe(1);
});

// 31. Next Permutation
import { nextPermutation } from '../src/app3';
it('should transform [1, 2, 3] to [1, 3, 2]', () => {
  const nums = [1, 2, 3];
  nextPermutation(nums);
  expect(nums.join(',')).toEqual('1,3,2');
});
it('should transform [3, 2, 1] to [1, 2, 3]', () => {
  const nums = [3, 2, 1];
  nextPermutation(nums);
  expect(nums.join(',')).toEqual('1,2,3');
});
it('should transform [1, 1, 2] to [1, 2, 1]', () => {
  const nums = [1, 1, 2];
  nextPermutation(nums);
  expect(nums.join(',')).toEqual('1,2,1');
});


import { permute1 } from '../src/app3';
it('should return all unique permutations for a given list of integers', () => {
  const nums = [1, 2, 2];
  const expected = [
    [1, 2, 2],
    [2, 1, 2],
    [2, 2, 1]
  ];
  const result = permute1(nums);
  expect(result).toEqual(expect.arrayContaining(expected));
  expect(result.length).toBe(expected.length);
});

it('should handle large lists efficiently without stack overflow', () => {
  const nums = new Array(10).fill(1); // Large list of repeated elements
  const result = () => permute1(nums);
  expect(result).not.toThrow();
});

it('should return a list containing a single permutation when all elements in the input list are identical', () => {
  const nums = [3, 3, 3];
  const expected = [[3, 3, 3]];
  const result = permute1(nums);
  expect(result).toEqual(expect.arrayContaining(expected));
  expect(result.length).toBe(expected.length);
});

it('should handle and return correct permutations when input list contains repeated elements', () => {
  const nums = [1, 2, 2];
  const expected = [
    [1, 2, 2],
    [2, 1, 2],
    [2, 2, 1]
  ];
  const result = permute1(nums);
  expect(result).toEqual(expect.arrayContaining(expected));
  expect(result.length).toBe(expected.length);
});


import { backtrack } from '../src/app3';
it('should generate all permutations for unique numbers', () => {
  const results:any = [];
  const nums = [1, 2, 3];
  const countMap = new Map();
  nums.forEach(num => countMap.set(num, 1));
  backtrack(results, [], nums.length, countMap);
  expect(results).toEqual([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]);
});
it('should handle lists with identical elements correctly', () => {
  const results:any = [];
  const nums = [2, 2, 2];
  const countMap = new Map();
  nums.forEach(num => countMap.set(num, 3));
  backtrack(results, [], nums.length, countMap);
  expect(results).toEqual([[2, 2, 2]]);
});

it('should handle single-element list correctly', () => {
  const results:any = [];
  const nums = [1];
  const countMap = new Map();
  nums.forEach(num => countMap.set(num, 1));
  backtrack(results, [], nums.length, countMap);
  expect(results).toEqual([[1]]);
});

it('should work with negative numbers in the input list', () => {
  const results:any = [];
  const nums = [-1, -2, -3];
  const countMap = new Map();
  nums.forEach(num => countMap.set(num, 1));
  backtrack(results, [], nums.length, countMap);
  expect(results).toEqual([[-1, -2, -3], [-1, -3, -2], [-2, -1, -3], [-2, -3, -1], [-3, -1, -2], [-3, -2, -1]]);
});