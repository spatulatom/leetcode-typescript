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
