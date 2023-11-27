interface NPC {
  health: number;
}

interface Enemy extends NPC {
  power?: number;
}

type Stranger = Enemy;

function makeEnemy(stranger: Stranger) {
  // return stranger.health // no squagle lines here
  return stranger.power; // squagel lines here, why?
}

console.log(makeEnemy({ health: 2, power: 4 }));

// 1. Two Sum
// Easy

// Companies
// Given an array of integers nums and an integer target, return indices of the two numbers
// such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the
// same element twice.

// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.

// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

// sol 1, brute approach
export function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

console.log('twoSum', twoSum([3, 2, 4], 6));

// 88. Merge Sorted Array
// Easy
// 13.3K
// 1.5K
// Companies
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two
// integers m and n, representing the number of elements in nums1 and nums2 respectively.

// Merge nums1 and nums2 into a single array sorted in non-decreasing order.

// The final sorted array should not be returned by the function, but instead be stored inside
// the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements
// denote the elements that should be merged, and the last n elements are set to 0 and should be
// ignored. nums2 has a length of n.

//  Example 1:

// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
// The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
// Example 2:

// Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
// Explanation: The arrays we are merging are [1] and [].
// The result of the merge is [1].
// Example 3:

// Input: nums1 = [0], m = 0, nums2 = [1], n = 1
// Output: [1]
// Explanation: The arrays we are merging are [] and [1].
// The result of the merge is [1].
// Note that because m = 0, there are no elements in nums1. The 0 is only there to
// ensure the merge result can fit in nums1.

// Constraints:

// nums1.length == m + n
// nums2.length == n
// 0 <= m, n <= 200
// 1 <= m + n <= 200
// -109 <= nums1[i], nums2[j] <= 109

// Follow up: Can you come up with an algorithm that runs in O(m + n) time?

/**
 Do not return anything, modify nums1 in-place instead.
 */
// sol 1, built in methods
export function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  nums1.splice(m);
  nums1.push(...nums2);
  nums1.sort((a, b) => a - b);
  nums1.reverse().splice(n + m);
  nums1.reverse();
}

console.log('merge', merge([1, 2, 3, 4, 5], 5, [], 0));

// 80. Remove Duplicates from Sorted Array II
// Medium
// 6.2K
// 1.2K
// Companies
// Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such
// that each unique element appears at most twice. The relative order of the elements should be kept
// the same.

// Since it is impossible to change the length of the array in some languages, you must instead have
// the result be placed in the first part of the array nums. More formally, if there are k elements
// after removing the duplicates, then the first k elements of nums should hold the final result.
// It does not matter what you leave beyond the first k elements.

// Return k after placing the final result in the first k slots of nums.

// Do not allocate extra space for another array. You must do this by modifying the input array
// in-place with O(1) extra memory.

// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.

// Example 1:

// Input: nums = [1,1,1,2,2,3]
// Output: 5, nums = [1,1,2,2,3,_]
// Explanation: Your function should return k = 5, with the first five elements of nums
// being 1, 1, 2, 2 and 3 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).
// Example 2:

// Input: nums = [0,0,1,1,1,1,2,3,3]
// Output: 7, nums = [0,0,1,1,2,3,3,_,_]
// Explanation: Your function should return k = 7, with the first seven elements of nums being
// 0, 0, 1, 1, 2, 3 and 3 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Constraints:

// 1 <= nums.length <= 3 * 104
// -104 <= nums[i] <= 104
// nums is sorted in non-decreasing order.

// sol 1, O(n)
// The first loop iterates over each element in the nums array once, so it has a 
// time complexity of O(n).

// The second loop also iterates over each element in the nums array once, so it 
// also has a time complexity of O(n).

// The splice method inside the second loop could have a time complexity of up to 
// O(n) in the worst-case scenario (when an element from the beginning or middle 
//   of the array is removed), because it needs to shift all the 
// following elements to fill the gap.

// However, since these operations are not nested and are performed sequentially, 
// we add the time complexities together. Therefore, the overall time complexity
//  of the function is O(n + n + n) = O(3n), which simplifies to O(n), because in 
//  Big O notation, we drop constant factors.
 export function removeDuplicates(nums: number[]): number {
  const hash: { [key:number]: number } = {};
  for (let i = 0; i < nums.length; i++) {
    if (!hash[nums[i]]) {
      hash[nums[i]] = 1;
    } else {
      hash[nums[i]]++;
    }
    if (hash[nums[i]] > 2) {
      nums[i] = 200;
    }
  }

  for (let i = nums.length; i >= 0; i--) {
    if (nums[i] === 200) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
}

console.log('removeDuplicates', removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]));
