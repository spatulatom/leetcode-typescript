// 53. Maximum Subarray
import { maxSubArray00 } from "../src/app7";

it('should return the maximum sum of a contiguous subarray when the array has positive numbers', () => {
    const nums = [1, 2, 3, 4, 5];
    const result = maxSubArray00(nums);
    expect(result).toBe(15);
  });