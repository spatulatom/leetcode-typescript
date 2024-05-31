// 139. Word Break
import { wordBreak } from '../src/app11';

it('should return true when the string can be segmented using dictionary words', () => {
  const s = 'leetcode';
  const wordDict = ['leet', 'code'];
  expect(wordBreak(s, wordDict)).toBe(true);
});

it('should return false when the string is a single character not in the dictionary', () => {
  const s = 'a';
  const wordDict = ['b'];
  expect(wordBreak(s, wordDict)).toBe(false);
});

it('should return false when the string cannot be segmented using dictionary words', () => {
    const s = "catsandog";
    const wordDict = ["cats", "dog", "sand", "and", "cat"];
    expect(wordBreak(s, wordDict)).toBe(false);
  });


  it('should return true when the string can be segmented using a dictionary with words of varying lengths', () => {
    const s = "applepenapple";
    const wordDict = ["apple", "pen"];
    expect(wordBreak(s, wordDict)).toBe(true);
  });