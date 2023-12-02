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
