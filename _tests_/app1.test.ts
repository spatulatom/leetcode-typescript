// 392. Is Subsequence
import { isSubsequence } from '../src/app1';

// Returns true if s is an empty string
it('should return true when s is an empty string', () => {
  expect(isSubsequence('', 'abc')).toBe(true);
});

it('should return true when s is a subsequence of t', () => {
  expect(isSubsequence('abc', 'abracadabra')).toBe(true);
});

it('should return false when s is not a subsequence of t', () => {
  expect(isSubsequence('abc', 'def')).toBe(false);
});
