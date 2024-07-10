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
export function maxSubArray00(nums: number[]): number {
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
// ([186,419,83,408],6249), expected 20
// 1. coins will get sorted into  [419, 408, 186, 83]
// 2. amount -419*14 and amount -186*2 , amount is equal to 11 (count is 16)
// 3. we cleqrly need different approach then greedy that will try a few
// 'branches' and picj the min amount
function coinChange1(coins: number[], amount: number): number {
  coins.sort((a, b) => b - a);
  let count = 0;
  for (let i = 0; i < coins.length; i++) {
    while (amount - coins[i] >= 0) {
      console.log(coins[i]);
      amount -= coins[i];
      count++;
    }
  }
  return amount ? -1 : count;
}

// sol 2, backtracking, time complexity is O(n*n)
function coinChange2(coins: number[], amount: number): number {
  coins.sort((a, b) => b - a);
  // return coins

  let min = Infinity;
  //   this is how you stop bactracking function by throwing an error
  // the first solution is found we are stopping the whole backtrack 'machine'
  // - yet this is just another version of greed approch only more complex
  // with backtracking
  try {
    backtrack(0, amount);
  } catch (e) {
    return min;
    // Caught the exception, do nothing here
  }

  function backtrack(count: number, amount: number) {
    if (amount === 0) {
      min = Math.min(min, count);
      console.log('min', min);
      throw new Error('Min number of coins found');
    }
    if (amount < 0) {
      return;
    }
    for (let i = 0; i < coins.length; i++) {
      if (amount - coins[i] < 0) continue;
      if (amount - coins[i] >= 0) {
        count++;
        backtrack(count, amount - coins[i]);
        count--;
      }
    }
  }

  return -1;
}
// inttuition was that since array is sorted in descending ored the first solution
// should be the correct one - it is not the case apparently using biiger coins first will
// result in this case // Wrong Answer
// 36 / 189 testcases passed
// Editorial
// Input
// coins =
// [186,419,83,408]
// amount =
// 6249

// Use Testcase
// Output
// 26
// Expected
// 20
// 3 coins of 186 (3 * 186 = 558)
// 5 coins of 419 (5 * 419 = 2095)
// 4 coins of 83 (4 * 83 = 332)
// 8 coins of 408 (8 * 408 = 3264)

// sol 3, dynamic solution
function coinChange3(coins: number[], amount: number) {
  let dp = new Array(amount + 1).fill(amount + 1);

  dp[0] = 0;
  for (let i = 0; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp;
  return dp[amount] > amount ? -1 : dp[amount];
}

console.log('coinChange', coinChange3([1, 2, 5], 11));

// Breakdown:  input `coins = [1,2,5]` and `amount = 11`.

// Here's a step-by-step breakdown:

// 1. **Initialization**: We start by initializing an array `dp` of size `amount + 1`
//  and fill it with `amount + 1`. This is because the maximum number of coins to make
//  up the amount can't be more than `amount` (when each coin is 1). So, `amount + 1`
//  effectively represents infinity in this context. We also set `dp[0] = 0` because
//   no coins are needed for `0` amount.

// 2. **Filling the dp array**: We then iterate over each amount from `0` to `amount`
// (inclusive). For each amount `i`, we check each coin. If the coin value is less
// than or equal to `i`, we update `dp[i]` as `min(dp[i], dp[i - coin] + 1)`. This
// means we're trying to see if using this coin would minimize the number of coins
//  needed for amount `i`.

// Let's see how `dp` array changes for your input:

// - Start: `dp = [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]`
// - After first coin (1): `dp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]`
// - After second coin (2): `dp = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6]`
// - After third coin (5): `dp = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]`

// 3. **Returning the result**: Finally, we return `dp[amount]` if `dp[amount] <= amount`,
// else `-1`. This is because if `dp[amount]` is still greater than `amount`, it
// means we couldn't find any combination of coins that sums up to `amount`.

// So, for your input, the minimum number of coins to make up amount `11` is `3`
// (five coin twice and one coin once).

// I hope this helps! If you have any more questions, feel free to ask. 😊
