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
  
  if((dividendAbs |0) !== dividendAbs){
    console.log('here')
    if (dividend < 0 && divisor > 0) return dividend
    if (dividend > 0 && divisor < 0) return dividend-1
    if (dividend < 0 && divisor < 0) return -dividend-1
    return dividend-1

  }

  let count = 0;
  let total = 0;
  if (divisorAbs === 1) {
    count = dividendAbs;
  } else {
    for (let i = 0; i <= dividendAbs; i=i+divisorAbs) {
      if (i - total === divisorAbs) {
        count++;
        total += divisorAbs;
      }
      console.log(i,count,total);
    }
  }

  if (dividend < 0 && divisor > 0) count = -count;
  if (dividend > 0 && divisor < 0) count = -count;
  return count;
}

// sol 2, 
var divide = function(dividend: number, divisor: number): number {
    const retIsNegative = Math.sign(divisor) !== Math.sign(dividend);
    dividend = Math.abs(dividend)
    divisor = Math.abs(divisor)
    
    let ret = 0
    while (divisor <= dividend) {
        let value = divisor
        let multiple = 1
        while (value + value <= dividend) {
            value += value
            multiple += multiple
        }
        dividend = dividend - value
        ret += multiple
    }
    
    if (ret > ((2**31) - 1)) {
        return retIsNegative ? -(2**31) : 2**31 - 1
    }
    return retIsNegative ? -ret : ret
};


console.log('divide', divide(2147483647, 1));


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


function maxProduct(nums: number[]): number {
    
};