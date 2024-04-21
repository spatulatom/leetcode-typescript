// 53. Maximum Subarray
import { maxSubArray00 } from "../src/app7";

it('should return the maximum sum of a contiguous subarray when the array has positive numbers', () => {
    const nums = [1, 2, 3, 4, 5];
    const result = maxSubArray00(nums);
    expect(result).toBe(15);
  });

  it('should return the correct maximum sum for an array with both positive and negative integers', () => {
    const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const result = maxSubArray00(nums);
    expect(result).toBe(6);
  });

  it('should return the element itself when the array has only one element', () => {
    const nums = [5];
    const result = maxSubArray00(nums);
    expect(result).toBe(5);
  });

