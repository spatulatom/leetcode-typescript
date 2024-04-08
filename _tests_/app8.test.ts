import { majorityElement1 } from "../src/app8";

it('should return an array with the majority element when it appears more than n/3 times', () => {
    const nums = [1, 2, 2, 3, 3, 3];
    const result = majorityElement1(nums);
    expect(result).toEqual([3]);
  });

  it('should return an empty array when the input array is empty', () => {
    const nums: number[] = [];
    const result = majorityElement1(nums);
    expect(result).toEqual([]);
  });

  it('should return an array with one element when the input array has only one element and it appears more than n/3 times', () => {
    const nums = [1];
    const result = majorityElement1(nums);
    expect(result).toEqual([1]);
  });

  import { lengthOfLIS } from "../src/app8";

  it('should return the correct length of the longest increasing subsequence', () => {
    const nums = [10, 9, 2, 5, 3, 7, 101, 18];
    const result = lengthOfLIS(nums);
    expect(result).toBe(4);
  });