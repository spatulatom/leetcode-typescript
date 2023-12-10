import { reverseVowels } from '../src/app4';

it('should return an empty string when given an empty string', () => {
  expect(reverseVowels('')).toBe('');
});

it('should return the same string when there are no vowels in the string', () => {
  expect(reverseVowels('bcd')).toBe('bcd');
});

it('should correctly reverse the vowels in a string with multiple vowels', () => {
  expect(reverseVowels('hello')).toBe('holle');
});
