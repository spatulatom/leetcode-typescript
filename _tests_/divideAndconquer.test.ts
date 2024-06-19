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