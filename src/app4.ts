// 345. Reverse Vowels of a String
// Easy
// 4.2K
// 2.7K
// Companies
// Given a string s, reverse only all the vowels in the string and return it.

// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in
//  both lower and upper cases, more than once.

// Example 1:

// Input: s = "hello"
// Output: "holle"
// Example 2:

// Input: s = "leetcode"
// Output: "leotcede"

// Constraints:

// 1 <= s.length <= 3 * 105
// s consist of printable ASCII characters.

// sol 1, brute force O(nm)
function reverseVowels1(s: string): string {
  const array = s.split('');
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  const vowelsInArray = [];
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < vowels.length; j++) {
      if (s[i] === vowels[j]) {
        vowelsInArray.push(s[i]);
        array[i] = '';
        break;
      }
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (array[i] === '') {
      array[i] = vowelsInArray[vowelsInArray.length - 1];
      vowelsInArray.pop();
    }
  }
  return array.join('');
}

// sol 2, runtime O(n)

export function reverseVowels(s: string): string {
  const array = s.split('');
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  let vowelObject: { [key: string]: string } = {};
  vowels.forEach((vowel) => {
    vowelObject[vowel] = vowel;
  });

  const vowelsInArray: string[] = [];
  for (let i = 0; i < s.length; i++) {
    if (vowelObject[s[i]]) {
      vowelsInArray.push(s[i]);
      array[i] = '';
    }
  }
  let count = vowelsInArray.length - 1;
  for (let i = 0; i < s.length; i++) {
    if (array[i] === '') {
      array[i] = vowelsInArray[count];
      count--;
    }
  }
  return array.join('');
}

console.log('reverseVowels', reverseVowels('hello'));

// 6. Zigzag Conversion
// Medium
// 7K
// 13.8K
// Companies
// The string "PAYPALISHIRING" is written in a zigzag pattern on a
// given number of rows like this: (you may want to display this pattern in a
//     fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a
// number of rows:

// string convert(string s, int numRows);

// Example 1:

// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"
// Example 2:

// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:
// P     I    N
// A   L S  I G
// Y A   H R
// P     I
// Example 3:

// Input: s = "A", numRows = 1
// Output: "A"

// Constraints:

// 1 <= s.length <= 1000
// s consists of English letters (lower-case and upper-case), ',' and '.'.
// 1 <= numRows <= 1000
// Accepted
// 1.2M
// Submissions
// 2.5M
// Acceptance Rate
// 46.5%


// sol 1, 2Darray,  O(n), space O(n)
function convert1(s: string, numRows: number): string {
    if(s.length===numRows) return s
  const arr: string[][] = new Array(numRows).fill(null).map((e) => {
    return new Array();
  });
  let pointer = 0;
  let up = false;
  let down = true;
  for (let i = 0; i < arr.length; i++) {
    if (up) {
      if (i !== 0 && i !== arr.length - 1) {
        let m = arr.length - 2;
        while (m > 0) {
          arr[m].push(s[pointer]);
        //   console.log('mmmmm', m)
          m--;
          pointer++;
        //   somehow this loop wasnt stoping on 'PAYPA', 4, so the line below:
          if(pointer>=s.length)break
        }
    i= arr.length - 1
      }
    } else if (down) {
      arr[i].push(s[pointer]);
      pointer++;
    }

    // console.log('here', s[pointer], 'i:', i,arr[i], pointer, 'down:', down, 'up:', up)

    if (i === arr.length - 1) {
      i = -1;
      if (down) {
        (up = true), (down = false);
      } else if (up) {
        (down = true), (up = false);
      }
    }

    if (pointer === s.length) break;
  }

  return arr.flat().join('')
}


// sol 2, time O(n) 

function convert(s: string, numRows: number): string {
    if (numRows <= 1) {
      return s;
    }
    let dir = 'down';
    let row = 0;
    // const arr: string[][] = Array.from({ length: numRows }, () => []);
    const arr: string[] = Array(numRows).fill('')
    for (let i = 0; i < s.length; i++) {
      arr[row]+=s[i]
      if (row === numRows - 1) {
        dir = 'up';
      } else if (row === 0) {
        dir = 'down';
      }
      if (dir === 'down') {
        row++;
      } else if (dir === 'up') {
        row--;
      }
    }
  
    return arr.join('');
  };



console.log('convert:', convert('PAYPA', 4));


// 79. Word Search
// Medium
// 14.7K
// 606
// Companies
// Given an m x n grid of characters board and a string word, return true if word
// exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells,
//  where adjacent cells are horizontally or vertically neighboring. The same letter
//  cell may not be used more than once.

//  Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
// Example 2:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
// Example 3:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

// Constraints:

// m == board.length
// n = board[i].length
// 1 <= m, n <= 6
// 1 <= word.length <= 15
// board and word consists of only lowercase and uppercase English letters.

// Follow up: Could you use search pruning to make your solution faster with a larger board?

function exist(board: string[][], word: string): boolean {
    return true
}

console.log(
  'exist:',
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCCED'
  )
);

