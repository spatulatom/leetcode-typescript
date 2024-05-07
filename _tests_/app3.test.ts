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
