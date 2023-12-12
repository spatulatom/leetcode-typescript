// 29. Divide Two Integers
// Medium
// 4.8K
// 14.4K
// Companies
// Given two integers dividend and divisor, divide two integers without using
// multiplication, division, and mod operator.

// The integer division should truncate toward zero, which means losing its
// fractional part. For example, 8.345 would be truncated to 8, and -2.7335
// would be truncated to -2.

// Return the quotient after dividing dividend by divisor.

// Note: Assume we are dealing with an environment that could only store integers
// within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if
// the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the
// quotient is strictly less than -231, then return -231.

// Example 1:

// Input: dividend = 10, divisor = 3
// Output: 3
// Explanation: 10/3 = 3.33333.. which is truncated to 3.
// Example 2:

// Input: dividend = 7, divisor = -3
// Output: -2
// Explanation: 7/-3 = -2.33333.. which is truncated to -2.

// Constraints:

// -231 <= dividend, divisor <= 231 - 1
// divisor != 0

// sol 1, naive, eceeds time
function divide1(dividend: number, divisor: number): number {
  const dividendAbs = Math.abs(dividend);
  const divisorAbs = Math.abs(divisor);

  if ((dividendAbs | 0) !== dividendAbs) {
    console.log('here');
    if (dividend < 0 && divisor > 0) return dividend;
    if (dividend > 0 && divisor < 0) return dividend - 1;
    if (dividend < 0 && divisor < 0) return -dividend - 1;
    return dividend - 1;
  }

  let count = 0;
  let total = 0;
  if (divisorAbs === 1) {
    count = dividendAbs;
  } else {
    for (let i = 0; i <= dividendAbs; i = i + divisorAbs) {
      if (i - total === divisorAbs) {
        count++;
        total += divisorAbs;
      }
      console.log(i, count, total);
    }
  }

  if (dividend < 0 && divisor > 0) count = -count;
  if (dividend > 0 && divisor < 0) count = -count;
  return count;
}

// sol 2,
var divide = function (dividend: number, divisor: number): number {
  const retIsNegative = Math.sign(divisor) !== Math.sign(dividend);
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);

  let ret = 0;
  while (divisor <= dividend) {
    console.log('loop1', divisor, dividend);
    let value = divisor;
    let multiple = 1;
    while (value + value <= dividend) {
      value += value;
      multiple += multiple;
      console.log('loop2', divisor, dividend, value);
    }
    dividend = dividend - value;
    ret += multiple;
  }

  if (ret > 2 ** 31 - 1) {
    return retIsNegative ? -(2 ** 31) : 2 ** 31 - 1;
  }
  return retIsNegative ? -ret : ret;
};

console.log('divide', divide(30, 3));

// 152. Maximum Product Subarray
// Medium
// 17.7K
// 565
// Companies
// Given an integer array nums, find a
// subarray
//  that has the largest product, and return the product.

// The test cases are generated so that the answer will fit in a 32-bit integer.

// Example 1:

// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
// Example 2:

// Input: nums = [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

// Constraints:

// 1 <= nums.length <= 2 * 104
// -10 <= nums[i] <= 10
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// Accepted
// 1.1M
// Submissions
// 3.3M
// Acceptance Rate
// 34.9%

// sol 1, brute force, O(n^2), space complexity O(n)
function maxProduct1(nums: number[]): number {
  const allSums = new Set();
  if (nums.length === 1) return nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) continue;
    let sum = 1;
    let length;
    if (i === 0) {
      length = nums.length - 2;
    } else {
      nums.length - 1;
    }
    length = nums.length - 1;
    for (let j = i; j < nums.length; j++) {
      sum *= nums[j];
      console.log('sum', sum, nums[j]);
      allSums.add(sum);
    }
  }
  let max: number = -Infinity;
  const sum = [...allSums].forEach((e: any) => {
    max = Math.max(max, e);
  });
  return max;
}

// sol 2

function maxProduct2(nums: number[]): number {
  let max: number = -Infinity;
  if (nums.length === 1) return nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) continue;
    let sum = 1;
    for (let j = i; j < nums.length; j++) {
      sum *= nums[j];
      max = Math.max(max, sum);
    }
  }

  return max;
}

// sol 3, runtime O(n)
// i can not use dynamic approach like below 53. Maximum Subarray sol 2
// becuse over there when sum goes below zero we should start then a new count
// of the sum, in here sum might go below zero and when it encounters negative element in the array
// like -2, it will go way above zero
function maxProduct(nums: number[]): number {
  let max: number = -Infinity;
  if (nums.length === 1) return nums[0];

  for (let i = 0; i < nums.length; i++) {}

  return max;
}

console.log('maxProduct', maxProduct([2, 3, -2, 4]));

// 238. Product of Array Except Self
// Medium
// 20.8K
// 1.2K
// Companies
// Given an integer array nums, return an array answer such that answer[i]
//  is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a
// 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the
// division operation.

//  Example 1:

// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
// Example 2:

// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

// Constraints:

// 2 <= nums.length <= 105
// -30 <= nums[i] <= 30
// The product of any prefix or suffix of nums is guaranteed to fit in
// a 32-bit integer.

// Follow up: Can you solve the problem in O(1) extra space complexity?
// (The output array does not count as extra space for space complexity analysis.)

/*
  The idea is to initialize an array of the size nums.length
  and filled with 1s. After that, go over the array from the start
  until the end and set each element as the product of the previous elements.
  
  Then, iterate one more time from the end until the start and update each element
  of the resulted array with the product of the elements which go after it.
*/

// sol 1, O(n)
function productExceptSelf(nums: number[]): number[] {
  // No division operator
  // Time complexity: O(n)
  // Space complexity: O(1)

  let product = 1;
  let result = new Array(nums.length);

  // Modify from start to end
  for (let i = 0; i < nums.length; i += 1) {
    result[i] = product;
    product *= nums[i];
  }
  // Modify from end to start
  product = 1;
  for (let i = nums.length - 1; i >= 0; i -= 1) {
    result[i] *= product;
    product *= nums[i];
  }

  return result;
}
console.log('productExceptSelf', productExceptSelf([1, 2, 3, 4]));

// 53. Maximum Subarray
// Medium
// 32.7K
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

// Follow up: If you have figured out the O(n) solution, try coding another
// solution using
// the divide and conquer approach, which is more subtle.

// sol 1, brute force O(n^2)
function maxSubArray1(nums: number[]): number {
  let max: number = -Infinity;
  if (nums.length === 1) return nums[0];

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      max = Math.max(max, sum);
    }
  }

  return max;
}

// sol 2, runtime O(n)

var maxSubArray = function (nums: number[]): number {
  // Initialize the max sum...
  let maxSum = nums[0];
  // Traverse all the element through the loop...
  for (let i = 1; i < nums.length; i++) {
    // nums[i] represents the largest sum of all subarrays ending with index i...
    // then its value should be the larger one between nums[i]...
    // nums[i-1] + nums[i] (largest sum plus current number with using prefix)...
    // calculate nums[0], nums[1]…, nums[n] while comparing each one with current largest sum...
    nums[i] = Math.max(0, nums[i - 1]) + nums[i];
    // if nums[i] > maxSum then maxSum = nums[i]...
    if (nums[i] > maxSum) maxSum = nums[i];
  }
  return maxSum; // return the contiguous subarray which has the largest sum...
};

console.log('maxSubArray', maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// 31. Next Permutation
// Medium
// 17.4K
// 4.4K
// Companies
// A permutation of an array of integers is an arrangement of its members
// into a sequence or linear order.

// For example, for arr = [1,2,3], the following are all the permutations of
// arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
// The next permutation of an array of integers is the next lexicographically
// greater permutation of its integer. More formally, if all the permutations
// of the array are sorted in one container according to their lexicographical
// order, then the next permutation of that array is the permutation that follows
// it in the sorted container. If such arrangement is not possible, the array
//  must be rearranged as the lowest possible order (i.e., sorted in ascending order).

// For example, the next permutation of arr = [1,2,3] is [1,3,2].
// Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
// While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1]
// does not have a lexicographical larger rearrangement.
// Given an array of integers nums, find the next permutation of nums.

// The replacement must be in place and use only constant extra memory.

// Example 1:

// Input: nums = [1,2,3]
// Output: [1,3,2]
// Example 2:

// Input: nums = [3,2,1]
// Output: [1,2,3]
// Example 3:

// Input: nums = [1,1,5]
// Output: [1,5,1]

// Constraints:

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 100

/**
 Do not return anything, modify nums in-place instead.
 */

//  sol 1, brute force, time exceeds on bigger arrays
function nextPermutation(nums: number[]): void {
  const results: string | any[] = [];
  const countMap = new Map();
  // Count the occurrences of each number in nums
  for (let num of nums) {
    if (countMap.has(num)) {
      countMap.set(num, countMap.get(num) + 1);
    } else {
      countMap.set(num, 1);
    }
  }
  backtrack(results, [], nums.length, countMap);

//  deafult sorting array makes it lexicographically sorted
  results.sort();
  const index = results.findIndex((e) => e === nums.join(''));


  if (index === results.length - 1) {
    //   if nums is the last array in results then the next one 
    // is the very first one
    for (let i = 0; i < nums.length; i++) {
      nums[i] = results[0][i];
    }
  } else {
    for (let i = 0; i < nums.length; i++) {
      nums[i] = results[index + 1][i];
    }
  }

  // return nums
  function backtrack(
    results: any,
    current: any,
    remaining: any,
    countMap: any
  ) {
    if (remaining === 0) {
      results.push(current.join(''));
      console.log('RESULTS', results)
      return;
    }
    // by using Map we are countin if our array has alredy used 
    // a digit from nums - since in permutation there can only be 
    // as many digits like in nums, for example nums [1,2,3] can not 
    // have in permutations 1,2 or three repeated but when nums [1,1,2]
    // 1 can be repeted.
    // for that reason simply check for inclusion like if(cuurrent.includes(nums[i]))
    //  is not enough and count is needed
    for (let [num, count] of countMap.entries()) {
      if (count > 0) {
        current.push(num);
        countMap.set(num, count - 1);
        backtrack(results, current, remaining - 1, countMap);
        current.pop();
        countMap.set(num, count);
      }
    }
  }
}

console.log('nextPermutation', nextPermutation([6,7,5]));

// SEPERATE EXERCISE:
// how to create permuttion of the array without reaping its elelemnts
// - if they are alredy repeated in the array the can be used as many times
// as in the array:
var permute = function (nums: any) {
  const results: any = [];
  const countMap = new Map();
  // Count the occurrences of each number in nums
  for (let num of nums) {
    if (countMap.has(num)) {
      countMap.set(num, countMap.get(num) + 1);
    } else {
      countMap.set(num, 1);
    }
  }
  backtrack(results, [], nums.length, countMap);
  return results;
};

function backtrack(results: any, current: any, remaining: any, countMap: any) {
  if (remaining === 0) {
    results.push([...current]);
    console.log('results', results)
    return;
  }
  for (let [num, count] of countMap.entries()) {
    if (count > 0) {
      current.push(num);
      countMap.set(num, count - 1);
      backtrack(results, current, remaining - 1, countMap);
      current.pop();
      countMap.set(num, count);
      // This ensures that the countMap is in the correct state for the next iteration
      // of the loop in the
      // current stack frame, even though it was modified in the recursive call.
      // So, even though countMap is passed by reference, the way we’re using it in the code
      // ensures that each function call works with the correct counts.
    }
  }
}

// console.log('permute', permute([6,7,5,3,5,6,2,9,1,2,7,0,9]));
