// 53. Maximum Subarray
// Medium
// 32.8K
// 1.4K
// Companies
// Given an integer array nums, find the
// subarray
//  with the largest sum, and return its sum.

// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
// Example 2:

// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.
// Example 3:

// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

// Constraints:

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

// Follow up: If you have figured out the O(n) solution, try coding another solution using
// the divide and conquer approach, which is more subtle.


// sol 1, brute force, 205/210 test tie linit eceeded
function maxSubArray0(nums: number[]): number {
let max = -Infinity
// let pointer = 
    for (let i=0;i<nums.length;i++){
        let sum = 0
        for (let j=i;j<nums.length;j++){
            sum+=nums[j]
            // console.log(sum, j)
            max= Math.max(max, sum)
        }
    }

  return max;
}

console.log('maxSubArray', maxSubArray0([-2]));
