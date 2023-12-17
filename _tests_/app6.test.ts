// 56. Merge Intervals
import { merge56 } from '../src/app6';

it('should merge overlapping intervals and return non-overlapping intervals', () => {
  const intervals = [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ];
  const result = merge56(intervals);
  expect(result).toEqual([
    [1, 6],
    [8, 10],
    [15, 18],
  ]);
});

it('should merge intervals with same start and end times', () => {
  const intervals = [
    [1, 4],
    [1, 4],
  ];
  const result = merge56(intervals);
  expect(result).toEqual([[1, 4]]);
});

it('should return same array for single interval input', () => {
  const intervals = [[1, 4]];
  const result = merge56(intervals);
  expect(result).toEqual([[1, 4]]);
});

it('should return same array for non-overlapping intervals', () => {
  const intervals = [
    [1, 3],
    [4, 6],
    [8, 10],
    [15, 18],
  ];
  const result = merge56(intervals);
  expect(result).toEqual([
    [1, 3],
    [4, 6],
    [8, 10],
    [15, 18],
  ]);
});
