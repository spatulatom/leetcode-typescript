// 56. Merge Intervals
import { insert, merge56 } from '../src/app6';

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

// 57. Insert Interval
it('should correctly insert new interval between two existing intervals', () => {
  const intervals = [
    [1, 3],
    [6, 9],
  ];
  const newInterval = [2, 5];
  const result = insert(intervals, newInterval);
  expect(result).toEqual([
    [1, 5],
    [6, 9],
  ]);
});

it('should insert new interval at the end of the intervals list', () => {
  const intervals = [
    [1, 3],
    [6, 9],
  ];
  const newInterval = [10, 12];
  const result = insert(intervals, newInterval);
  expect(result).toEqual([
    [1, 3],
    [6, 9],
    [10, 12],
  ]);
});

it('should return new interval as is if it does not overlap with any existing intervals', () => {
  const intervals = [
    [1, 3],
    [6, 9],
  ];
  const newInterval = [4, 5];
  const result = insert(intervals, newInterval);
  expect(result).toEqual([
    [1, 3],
    [4, 5],
    [6, 9],
  ]);
});
