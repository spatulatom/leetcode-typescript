import { binarySearch } from '../src/divideAndconquer';
it('should return the middle index when target is present in the middle of the array', () => {
  const arr = [1, 2, 3, 4, 5];
  const target = 3;
  const result = binarySearch(arr, target);
  expect(result).toBe(2);
});
it('should return -1 when array is empty', () => {
  const arr: any = [];
  const target = 3;
  const result = binarySearch(arr, target);
  expect(result).toBe(-1);
});
it('should return the index when target is present in the first half of the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 2;
    const result = binarySearch(arr, target);
    expect(result).toBe(1);
  });
  
  it('should return 0 when array has one element which is the target', () => {
    const arr = [5];
    const target = 5;
    const result = binarySearch(arr, target);
    expect(result).toBe(0);
  });

  // second suit
  import { findMax } from '../src/divideAndconquer';
  it('should find the maximum element when the array is sorted', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = findMax(arr, 0, arr.length - 1);
    expect(result).toBe(5);
});
it('should find the maximum element in an unsorted array', () => {
  const arr = [3, 7, 1, 9, 5];
  const result = findMax(arr, 0, arr.length - 1);
  expect(result).toBe(9);
});