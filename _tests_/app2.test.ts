// 409. Longest Palindrome
import { longestPalindrome } from '../src/app2';

it('should return 1 when given a string with length 1', () => {
  expect(longestPalindrome('a')).toBe(1);
});

it('should return 0 when given an empty string', () => {
  expect(longestPalindrome('')).toBe(0);
});
