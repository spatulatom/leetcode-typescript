// 819. Most Common Word
// Easy
// 1.6K
// 3K
// Companies
// Given a string paragraph and a string array of the banned words banned,
// return the most frequent word that is not banned. It is guaranteed there
// is at least one word that is not banned, and that the answer is unique.

// The words in paragraph are case-insensitive and the answer should be returned
// in lowercase.

// Example 1:

// Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.",
// banned = ["hit"]
// Output: "ball"
// Explanation:
// "hit" occurs 3 times, but it is a banned word.
// "ball" occurs twice (and no other word does), so it is the most frequent
//  non-banned word in the paragraph.
// Note that words in the paragraph are not case sensitive,
// that punctuation is ignored (even if adjacent to words, such as "ball,"),
// and that "hit" isn't the answer even though it occurs more because it is banned.
// Example 2:

// Input: paragraph = "a.", banned = []
// Output: "a"

// Constraints:

// 1 <= paragraph.length <= 1000
// paragraph consists of English letters, space ' ', or one of the symbols: "!?',;.".
// 0 <= banned.length <= 100
// 1 <= banned[i].length <= 10
// banned[i] consists of only lowercase English letters.

// sol 1, systematic approach, step 2 and 4 most expensive with time complexity O(n^m+kl log k)
// but since m is a constant representing symbols we have O(n +k log k),
// where m are individual words in parahraph and k are symbols;
// space complexity: O(n)
function mostCommonWord(paragraph: string, banned: string[]): string {
  //1. change paragraph to array arr
  const arr: string[] | string[][] = paragraph.split(' ');

  // 2.remove comas and other symbols placed at the end of a string
  const symbols = "!?',;.";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < symbols.length; j++) {
      if (arr[i][arr[i].length - 1] === symbols[j]) {
        const word = arr[i].split('');
        word.pop();
        arr[i] = word.join('');
      }
    }
    // and convert to lowercase
    arr[i] = arr[i].toLocaleLowerCase();
  }

  // 3.  remove comas placed inside a string for ex: 'a, a, a, a, b,b,b,c, c', banned ['a]
  // expaected result: b. so b,b,b,c is not one string but comas have to be removed
  // and 4 entries has to be added to the arr. Note that last coma after c has been
  // alredy removed earlier with other symbols at step 2
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(',')) {
      const arr2: any = arr[i].split(',').join('').split('');
      arr[i] = arr2;
    }
  }
  const newArr = arr.flat();

  //   4. create a hash map counting entries in the array
  const hash: { [key: string]: number } = {};
  for (let i = 0; i < newArr.length; i++) {
    hash[newArr[i]] = (hash[newArr[i]] ?? 0) + 1;
  }

  //   5. remove from hash banned entries
  if (banned[0]) {
    banned.forEach((e) => {
      delete hash[e.toLocaleLowerCase()];
    });
  }
  let max = -Infinity;
  return Object.entries(hash).sort((a, b) => {
    return b[1] - a[1];
  })[0][0];
}

// console.log(
//   'mostCommonWord',
//   mostCommonWord('Bob hit a ball, the hit BALL flew far after it was hit.', [
//     'hit',
//   ])
// );
console.log('mostCommonWord', mostCommonWord('a, a, a, a, b,b,b,c, c', ['a']));

// Wrong Answer
// 47 / 48 testcases passed
// Editorial
// Input
// paragraph =
// "a, a, a, a, b,b,b,c, c"
// banned =
// ["a"]

// Use Testcase
// Output
// "b,b,b,c"
// Expected
// "b"

// 1512. Number of Good Pairs
// Easy
// 5.2K
// 227
// Companies
// Given an array of integers nums, return the number of good pairs.

// A pair (i, j) is called good if nums[i] == nums[j] and i < j.

// Example 1:

// Input: nums = [1,2,3,1,1,3]
// Output: 4
// Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
// Example 2:

// Input: nums = [1,1,1,1]
// Output: 6
// Explanation: Each pair in the array are good.
// Example 3:

// Input: nums = [1,2,3]
// Output: 0

// Constraints:

// 1 <= nums.length <= 100
// 1 <= nums[i] <= 100

// sol 1, time complexity O (n^2), space complexity O(1)
function numIdenticalPairs(nums: number[]): number {
  let count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        count++;
      }
    }
  }
  return count;
}

console.log('numIdenticalPairs', numIdenticalPairs([1, 2, 3, 1, 1, 3]));

// 1353. Maximum Number of Events That Can Be Attended
// Medium
// 2.9K
// 390
// Companies
// You are given an array of events where events[i] = [startDayi, endDayi].
// Every event i starts at startDayi and ends at endDayi.

// You can attend an event i at any day d where startTimei <= d <= endTimei.
// You can only attend one event at any time d.

// Return the maximum number of events you can attend.

// Example 1:
// Input: events = [[1,2],[2,3],[3,4]]
// Output: 3
// Explanation: You can attend all the three events.
// One way to attend them all is as shown.
// Attend the first event on day 1.
// Attend the second event on day 2.
// Attend the third event on day 3.
// Example 2:

// Input: events= [[1,2],[2,3],[3,4],[1,2]]
// Output: 4

// Constraints:

// 1 <= events.length <= 105
// events[i].length == 2
// 1 <= startDayi <= endDayi <= 105

function maxEvents(events: number[][]): number {
  const obj = { start: +Infinity, end: 0 };

  let count = 0;
  for (let i = 0; i < events.length; i++) {
    if (events[i][0] < obj.start) {
      obj.start = events[i][0];
      count++;
    }
    if (events[i][1] > obj.end) {
      obj.end = events[i][1];
      count++;
    }
  }
  obj.start--;
  obj.end++;
  const copyObj = { ...obj };
  events.sort((a, b) => {
    return a[0] - b[0];
  });
  const groups = [];
  let subGroup = [events[0]];
  for (let i = 1; i < events.length; i++) {
    if (events[i][0] === events[i - 1][0]) {
      subGroup.push(events[i]);
    } else if (events[i][0] !== events[i - 1][0]) {
      groups.push([...subGroup]);
      subGroup = [];
      subGroup.push(events[i]);
    }
    if (i === events.length - 1 && subGroup.length > 0) {
      groups.push([...subGroup]);
    }
  }
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].length > 1) {
      groups[i].sort((a, b) => {
        return a[1] - b[1];
      });
    }
  }
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].length > 1) {
      for (let j = 0; j < groups[i].length; j++) {
        if (groups[i][j][0] > obj.start) {
          obj.start++;
        } else if (groups[i][j][1] < obj.end) {
          obj.end--;
        }
      }
    } else if (groups[i].length === 1) {
      if (groups[i][0][0] > obj.start) {
        obj.start++;
      } else if (groups[i][0][1] < obj.end) {
        obj.end--;
      }
    }
  }
  const nr = obj.start - (copyObj.start) + (copyObj.end) - obj.end;
return [obj, copyObj, nr]
  if (obj.end - obj.start < 0) {
    return events.length;
  } else {
    const nr = obj.start - (copyObj.start) + (copyObj.end) - obj.end;
    return nr;
  }
}

console.log(
  'maxEvents',
  maxEvents([[1,4],[4,4],[2,2],[3,4],[1,1]])
);


// Wrong Answer
// 27 / 44 testcases passed
// Editorial
// Input
// events =
// [[1,4],[4,4],[2,2],[3,4],[1,1]]

// Use Testcase
// Output
// 5
// Expected
// 4