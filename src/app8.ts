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
function majorityElement1(nums: number[]): number[] {
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


// sol 2, attempt at O(1) space
// Boyer-Moore Voting Algorithm. This algorithm is designed to find majority elements in a 
// sequence in linear time and constant space.
// The key insight is that if a number appears more than n/3 times in an array,
//  there can be at most 2 such numbers.

function majorityElement(nums: number[]): number[] {
    let count1 = 0, count2 = 0, candidate1 = 0, candidate2 = 1;

    for (let num of nums) {
        if (num === candidate1) {
            count1++;
        } else if (num === candidate2) {
            count2++;
        } else if (count1 === 0) {
            candidate1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            candidate2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }

    let result:number[] = [];
    [candidate1, candidate2].forEach(candidate => {
        let count = 0;
        for (let num of nums) {
            if (num === candidate) {
                count++;
            }
        }
        if (count > Math.floor(nums.length / 3)) {
            result.push(candidate);
        }
    });

    return result;
}

console.log('majorityElement', majorityElement([3, 2, 3]));


// 300. Longest Increasing Subsequence
// Medium
// 19.3K
// 366
// Companies
// Given an integer array nums, return the length of the longest strictly increasing 
// subsequence
// .

// Example 1:

// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], 
// therefore the length is 4.
// Example 2:

// Input: nums = [0,1,0,3,2,3]
// Output: 4
// Example 3:

// Input: nums = [7,7,7,7,7,7,7]
// Output: 1
 

// Constraints:
// 1 <= nums.length <= 2500
// -104 <= nums[i] <= 104
 

// Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
