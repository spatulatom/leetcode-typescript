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

// sol 1, brute force, 205/210 test tie linit eceeded,
// time complexity On^2, space complexity O(1)
function maxSubArray0(nums: number[]): number {
  let max = -Infinity;
  // let pointer =
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      // console.log(sum, j)
      max = Math.max(max, sum);
    }
  }

  return max;
}

// sol 2, time complexity O(n), space complexity O(1)
function maxSubArray00(nums: number[]): number {
  let sum = nums[0];
  let max = -Infinity;
  max = Math.max(max, sum);

  for (let i = 1; i < nums.length; i++) {
    max = Math.max(max, nums[i]);
    if (sum + nums[i] >= nums[i - 1] + nums[i]) {
      sum += nums[i];
      max = Math.max(max, sum);
    } else if (nums[i - 1] + nums[i] > nums[i]) {
      sum = nums[i - 1] + nums[i];
      max = Math.max(max, sum);
    }
  }

  return max;
}

console.log('maxSubArray', maxSubArray00([-1, -2]));

// You're correct that for the Maximum Subarray problem, an O(n^2) solution might be
// more straightforward to implement but can be costly in terms of time complexity,
// especially for large inputs.

// As for O(n) solutions, there are indeed a few different approaches one could take:

// 1. **Kadane's Algorithm**: This is the most well-known O(n) solution. It involves
// initializing two variables, `max_so_far` and `max_ending_here`, to the first element
// of the array. Then, for each element in the array, `max_ending_here` is updated as
// the maximum of the current element and the sum of `max_ending_here` and the current element.
// If `max_ending_here` is greater than `max_so_far`, then `max_so_far` is updated.
// Finally, `max_so_far` is returned as the maximum subarray sum.

// 2. **Divide and Conquer**: This approach involves dividing the array into two
// halves and finding the maximum subarray sum in each half recursively. The
//  maximum subarray sum is the maximum of the maximum subarray sum in the left
//  half, the right half, and the maximum subarray sum crossing the midpoint.

// 3. **Your Approach**: Your approach is another interesting O(n) solution. It
// cleverly compares the sum of the current and previous elements with the sum of
// the current and next elements to decide whether to extend the current subarray
// or start a new one.

// Each of these approaches has its own advantages and nuances, and the best one
// to use can depend on the specific requirements of the problem and the characteristics
// of the input data. It's always beneficial to understand multiple approaches to a
// problem, as it can give you a deeper understanding of the problem and help you become
// a better problem solver. Keep up the great work!



// 322. Coin Change
// Medium
// You are given an integer array coins representing coins of different denominations 
// and an integer amount representing a total amount of money.
// Return the fewest number of coins that you need to make up that amount. If that 
// amount of money cannot be made up by any combination of the coins, return -1.
// You may assume that you have an infinite number of each kind of coin. 

// Example 1:

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1
// Example 3:

// Input: coins = [1], amount = 0
// Output: 0
 

// Constraints:
// 1 <= coins.length <= 12
// 1 <= coins[i] <= 231 - 1
// 0 <= amount <= 104

// sol 1, greedy approach, it will fail for this test:
// coinChange([186,419,83,408],6249), expected 20
// 1. coins will get sorted into  [419, 408, 186, 83]
// 2. amount -419*14 and amount -186*2 , amount is equal to 11 (count is 16)
// 3. we cleqrly need different approach then greedy that will try a few 
// 'branches' and picj the min amount
function coinChange(coins: number[], amount: number): number {
    coins.sort((a,b)=>b-a)
    // return coins
    let count =0
    let pointer = 0
    for(let i=0;i<coins.length;i++){

        while(amount-coins[i]>=0){
            console.log(coins[i])
amount-=coins[i]
count++
        }
    }
return count
    return amount?-1:count
};

console.log('coinChange', coinChange([186,419,83,408],6249))