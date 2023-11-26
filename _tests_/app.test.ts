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
