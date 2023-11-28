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
  const hash: { [key: number]: number } = {};
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

// 189. Rotate Array
// Medium
// 16.7K
// 1.8K
// Companies
// Given an integer array nums, rotate the array to the right by k steps,
// where k is non-negative.

// Example 1:

// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]
// Example 2:

// Input: nums = [-1,-100,3,99], k = 2
// Output: [3,99,-1,-100]
// Explanation:
// rotate 1 steps to the right: [99,-1,-100,3]
// rotate 2 steps to the right: [3,99,-1,-100]

// Constraints:

// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 105

// Follow up:

// Try to come up with as many solutions as you can. There are at least three
// different ways to solve this problem.
// Could you do it in-place with O(1) extra space?

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  for (let i = 1; i <= k; i++) {
    const pop: number | undefined = nums.pop();
    if (pop !== undefined) nums.unshift(pop);
  }
}

console.log('rotate', rotate([1, 2, 3, 4, 5, 6, 7], 3));

//  55. Jump Game
// Medium
// 18.2K
// 1.1K
// Companies
// You are given an integer array nums. You are initially positioned at the
// array's first index, and each element in the array represents your maximum jump
//  length at that position.

// Return true if you can reach the last index, or false otherwise.

// Example 1:

// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:

// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length
// is 0, which makes it impossible to reach the last index.

// Constraints:

// 1 <= nums.length <= 104
// 0 <= nums[i] <= 105
// Accepted
// 1.6M

// sol 1, try greedy appraoch, time O(n), spaceO(1)
function canJump(nums: number[]): boolean {
  if (nums.length === 1) return true;
  let jump = nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (i === jump) {
      if (nums[i] === 0) return false;
      jump = nums[i] + i;
    }

    if (jump >= nums.length - 1) {
      return true;
    }
    // greedy part, updating jump if value > than current jump
    if (nums[i] + i > jump) {
      jump = nums[i] + i;
    }
  }

  return false;
}
console.log('canJump', canJump([0]));

// 11. Container With Most Water
// Medium

// You are given an integer array height of length n. There are n vertical lines drawn such
// that the two endpoints of the ith line are (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container, such that the container
// contains the most water.

// Return the maximum amount of water a container can store.

// Notice that you may not slant the container.

// Example 1:

// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
// In this case, the max area of water (blue section) the container can contain is 49.

// Example 2:
// Input: height = [1,1]
// Output: 1

// Constraints:
// n == height.length
// 2 <= n <= 105
// 0 <= height[i] <= 104

// sol 1, brute force approach
// for every element x and y check this:
// smaller el (x or y) * distance between elements = area with water
function maxArea1(height: number[]): number {
  let maxArea = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = 1; j < height.length; j++) {
      const area = Math.min(height[i], height[j]) * (j - i);
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}

// sol 2, two pointers, time complexity O(n) sinc ein every
// scenerion pointers left and right traverse the entire array exaclty once.
// space complexity is O(1)
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    maxArea = Math.max(maxArea, area);
    if (height[left] > height[right]) {
      right--;
    } else if (height[left] < height[right]) {
      left++;
    } else if (height[left] === height[right]) {
      right--;
    }
  }

  return maxArea;
}

console.log('maxArea', maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
