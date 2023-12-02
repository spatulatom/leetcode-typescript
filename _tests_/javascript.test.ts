import { checkIfInstanceOf } from '../src/javascript';
// Returns false if the object is not an instance of the given class
it('should return false when the object is not an instance of the given class', () => {
  // Arrange
  class TestClass {}
  const obj = {};

  // Act
  const result = checkIfInstanceOf(obj, TestClass);

  // Assert
  expect(result).toBe(false);
});

// Returns false if the classFunction has no prototype
it('should return false when the classFunction has no prototype', () => {
  // Arrange
  const obj = {};
  function TestClass() {}
  TestClass.prototype = undefined;

  // Act
  const result = checkIfInstanceOf(obj, TestClass);

  // Assert
  expect(result).toBe(false);
});

// 2695. Array Wrapper
import { ArrayWrapper } from '../src/javascript';

// Adding two instances of ArrayWrapper with non-empty arrays should return the sum of all elements in both arrays.
it('should return the sum of all elements in both arrays when adding two instances of ArrayWrapper with non-empty arrays', () => {
  const nums1 = [1, 2, 3];
  const nums2 = [4, 5, 6];
  const wrapper1 = new ArrayWrapper(nums1);
  const wrapper2 = new ArrayWrapper(nums2);
  const sum = wrapper1.valueOf() + wrapper2.valueOf();
  expect(sum).toBe(21);
});

it('should return an object with an empty array when creating an instance of ArrayWrapper with an empty array', () => {
  const nums: number[] = [];
  const wrapper = new ArrayWrapper(nums);
  expect(wrapper.nums).toEqual([]);
});

it('should return a string representation of the array surrounded by brackets when calling String() on an instance of ArrayWrapper', () => {
  const nums = [1, 2, 3];
  const wrapper = new ArrayWrapper(nums);
  expect(String(wrapper)).toEqual('[1,2,3]');
});

it('should return the correct sum when adding two instances of ArrayWrapper with arrays containing the minimum allowed integer value', () => {
  const nums1 = [Number.MIN_SAFE_INTEGER];
  const nums2 = [Number.MIN_SAFE_INTEGER];
  const wrapper1 = new ArrayWrapper(nums1);
  const wrapper2 = new ArrayWrapper(nums2);
  expect(wrapper1.valueOf() + wrapper2.valueOf()).toEqual(Number.MIN_SAFE_INTEGER * 2);
});


import {chunk} from  '../src/javascript';
it('should return an empty array when given an empty array and any size', () => {
  const arr:any = [];
  const size = 3;
  const result = chunk(arr, size);
  expect(result).toEqual([]);
});