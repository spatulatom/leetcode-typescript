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
it('should handle strings with both uppercase and lowercase letters correctly', () => {
  expect(longestPalindrome('aAAbbb')).toEqual(5);
});
it('should process strings with all unique characters correctly', () => {
  expect(longestPalindrome('abcdefg')).toEqual(1);
});
it('should return 7 for "abccccdd"', () => {
  expect(longestPalindrome("abccccdd")).toEqual(7);
});
it('should return 4 for "aabb"', () => {
  expect(longestPalindrome("aabb")).toEqual(4);
});