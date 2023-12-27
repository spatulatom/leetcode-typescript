// 229. Majority Element II
// Medium
// 9.2K
// 398
// Companies
// Given an integer array of size n, find all elements that appear
// more than ⌊ n/3 ⌋ times.

// Example 1:
// Input: nums = [3,2,3]
// Output: [3]
// Example 2:

// Input: nums = [1]
// Output: [1]
// Example 3:

// Input: nums = [1,2]
// Output: [1,2]

// Constraints:
// 1 <= nums.length <= 5 * 104
// -109 <= nums[i] <= 109

// Follow up: Could you solve the problem in linear time and in O(1) space?

// sol 1, time O(n), space O(n)
// 1. how to calulate [x] floor division, concept in mathematics represents
// gretest integer less than or equal to x;
// in our case we want x= n-length of the array , /3, and rounding down
function majorityElement(nums: number[]): number[] {
  // lets calculte floor division:
  const floorDivision = Math.floor(nums.length / 3);
  // lets calculate frequency of eleemnts appearence:
  const frequencyHash: { [key: string]: number } = {};
  for (let i = 0; i < nums.length; i++) {
    frequencyHash[nums[i]] = (frequencyHash[nums[i]] ?? 0) + 1;
  }
  for (let key in frequencyHash) {
    if (frequencyHash[key] <= floorDivision) {
      delete frequencyHash[key];
    }
  }
  return Object.keys(frequencyHash).map(Number);
}

console.log('majorityElement', majorityElement([3, 2, 3]));
