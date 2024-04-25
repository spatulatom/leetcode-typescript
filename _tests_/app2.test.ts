// 409. Longest Palindrome
import { longestPalindrome } from '../src/app2';

it('should return 1 when given a string with length 1', () => {
  expect(longestPalindrome('a')).toBe(1);
});

it('should return 0 when given an empty string', () => {
  expect(longestPalindrome('')).toBe(0);
});

it('should return the length of the string when all characters are the same', () => {
  expect(longestPalindrome('aaaaaa')).toBe(6);
});
it('should return the correct length of the longest palindrome when the string contains more than two different characters', () => {
  expect(longestPalindrome('abccccdd')).toBe(7);
});
