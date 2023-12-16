// backtracking on a 1D array:
function permute0(str: string[], l: number, r: number) {
  if (l === r) {
    console.log(str.join(''));
  } else {
    for (let i = l; i <= r; i++) {
      [str[l], str[i]] = [str[i], str[l]]; // swap
      permute0(str, l + 1, r); // recurse
      [str[l], str[i]] = [str[i], str[l]]; // backtrack
    }
  }
}
// The “value we’re keeping track of” in this case is the starting index l.
// As we recurse, we increment l (i.e., move forward in the string). As we backtrack,
// we restore l to its original value (i.e., move backward in the string).
// Using the index and swapping elements is a common pattern in backtracking algorithms
// for permutations and combinations because it helps in avoiding unnecessary duplicate
// computations. It's an optimization technique that can significantly
// improve the performance of the algorithm.

// this exapmple below attemps to do the same but
// 1. it fails sinc eswoping indexex is hard to mimic
// 2. dosent track its index (like above l+1) so the amount of bactracking === all
// possible combinations

function permute(
  str: string[],
  arr: string[] = [],
  set: Set<string> = new Set()
) {
  if (arr.length === str.length) {
    set.add(arr.join(''));
    // console.log(arr.join(''), arr);
  } else {
    for (let i = 0; i < str.length; i++) {
      if (arr.indexOf(str[i]) === -1 || arr.lastIndexOf(str[i]) === i) {
        arr.push(str[i]);
        permute(str, arr, set);
        arr.pop();
      }
    }
  }
}

const str = 'AAB';
const set = new Set<string>();
permute(str.split(''), [], set);
console.log('set', set);

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

// sol 1, backtracking sol
function exist(board: string[][], word: string): boolean {
  const rows = board.length;
  const cols = board[0].length;

  function backtrack(row: number, col: number, index: number): boolean {
    // Base case: Word found
    if (index === word.length) {
      return true;
    }

    // Check boundaries and character match
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      board[row][col] !== word[index]
    ) {
      return false;
    }

    // Mark the current cell as visited
    const originalChar = board[row][col];
    board[row][col] = '*';

    // Explore adjacent cells
    const found =
      backtrack(row + 1, col, index + 1) ||
      backtrack(row - 1, col, index + 1) ||
      backtrack(row, col + 1, index + 1) ||
      backtrack(row, col - 1, index + 1);

    // Backtrack: Restore the original value of the cell
    board[row][col] = originalChar;

    return found;
  }

  // Iterate through each cell in the board
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Start the backtracking process from each cell
      if (backtrack(row, col, 0)) {
        return true;
      }
    }
  }

  // Word not found in the entire board
  return false;
}

// Example usage:
const board = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
];

const word = 'ABCCED';
const result = exist(board, word);
console.log(result); // Output: true

// sol 2
// dynmic sol
function exist2(board: string[][], word: string): boolean {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(row: number, col: number, index: number): boolean {
    if (index === word.length) {
      return true; // Word found
    }

    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      board[row][col] !== word[index]
    ) {
      return false; // Out of bounds or mismatch
    }

    const originalChar = board[row][col];
    board[row][col] = '*'; // Mark the cell as visited

    // Explore adjacent cells
    const found =
      dfs(row + 1, col, index + 1) ||
      dfs(row - 1, col, index + 1) ||
      dfs(row, col + 1, index + 1) ||
      dfs(row, col - 1, index + 1);

    board[row][col] = originalChar; // Backtrack

    return found;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (dfs(row, col, 0)) {
        return true; // Word found starting from this cell
      }
    }
  }

  return false; // Word not found in the entire board
}

// 73. Set Matrix Zeroes
// Medium
// 13.6K
// 680
// Companies
// Given an m x n integer matrix matrix, if an element is 0, set its entire
// row and column to 0's.

// You must do it in place.

//  Example 1:
// Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
// Output: [[1,0,1],[0,0,0],[1,0,1]]
// Example 2:

// Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

// Constraints:

// m == matrix.length
// n == matrix[0].length
// 1 <= m, n <= 200
// -231 <= matrix[i][j] <= 231 - 1

// Follow up:

// A straightforward solution using O(mn) space is probably a bad idea.
// A simple improvement uses O(m + n) space, but still not the best solution.
// Could you devise a constant space solution?
// Accepted
// 1.2M
// Submissions
// 2.3M

/**
 Do not return anything, modify matrix in-place instead.
 */
// sol 1, time O((nm)²), space O(nm)
function setZeroes(matrix: number[][]): void {
  // traverse matrix and mark we are zeros
  const zeros: { [key: string]: boolean } = {};
  let key = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      // console.log(i, j)
      if (matrix[i][j] === 0) {
        // console.log(i, j);
        zeros[`${[i]}+${[j]}`] = true;
        key++;
      }
    }
  }
  const zerosArr = Object.values(zeros);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (zeros[`${[i]}+${[j]}`]) {
        // console.log('here', i, j);
        for (let k = 0; k < matrix[0].length; k++) {
          matrix[i][k] = 0;
        }
        for (let m = 0; m < matrix.length; m++) {
          matrix[m][j] = 0;
        }
      }
    }
  }
}

console.log(
  'setZeroes',
  setZeroes([
    [9, 8, 5, 1, 8, 0, 7, 3, 4, 1, 2, 0],
    [1, 4, 3, 3, 8, 1, 6, 9, 3, 5, 7, 3],
    [2, 5, 0, 9, 5, 9, 6, 4, 8, 4, 7, 6],
    [4, 5, 2, 0, 8, 4, 3, 1, 0, 6, 4, 8],
    [9, 0, 9, 5, 7, 7, 0, 9, 2, 2, 0, 9],
    [2, 7, 6, 2, 1, 3, 0, 7, 0, 2, 7, 0],
    [6, 0, 2, 8, 9, 6, 6, 0, 9, 6, 7, 6],
    [3, 8, 8, 7, 0, 8, 9, 4, 7, 5, 6, 0],
    [0, 9, 7, 3, 1, 7, 3, 0, 9, 7, 8, 8],
    [6, 7, 1, 5, 3, 8, 3, 8, 6, 1, 7, 9],
    [2, 6, 3, 9, 1, 2, 2, 4, 1, 9, 7, 4],
    [8, 0, 4, 8, 8, 5, 8, 4, 2, 9, 1, 7],
  ])
);

// As for the time and space complexity:

// Time Complexity: The time complexity of your solution is O((nm)²), not O(nmm).
// This is because you have two nested loops to traverse the matrix (which is O(nm)),
//  and for each cell, you might
// have to traverse the matrix again to set the entire row and column to zero (which
//   is also O(nm)). Therefore, the total time complexity is O((nm)²).
// Space Complexity: The space complexity of your solution is O(n*m), as you mentioned.
//  This is because in the worst case, every cell in the matrix could be zero, and
//  you would store each of these cells in the zeros object.

// so bascally we can say that the time complxity is On^2?
// In the context of your “Set Matrix Zeroes” function, the time complexity is
// indeed O(n²), where n is the total number of elements in the matrix. This is
// because for each element in the matrix,
// you might have to traverse the entire matrix again

// 48. Rotate Image
// Medium
// 16.7K
// 743
// Companies
// You are given an n x n 2D matrix representing an image, rotate the image by 90
// degrees (clockwise).

// You have to rotate the image in-place, which means you have to modify the input 2D matrix
// directly. DO NOT allocate another 2D matrix and do the rotation.

// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [[7,4,1],[8,5,2],[9,6,3]]
// Example 2:

// Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
// Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

// Constraints:

// n == matrix.length == matrix[i].length
// 1 <= n <= 20
// -1000 <= matrix[i][j] <= 1000
// Accepted
// 1.5M
// Submissions
// 2.1M
// Acceptance Rate
// 73.2%

/**
 Do not return anything, modify matrix in-place instead.
 */

//  sol 1, O(n^2)
function rotate(matrix: number[][]): void {
  // const copy = [...matrix]; // this line will only create shallow copy
  const copy = matrix.map((inner) => [...inner]);
  matrix[2][2] = 10;

  let inner = 0;
  for (let i = 0; i < matrix.length; i++) {
    let outer = matrix.length - 1;
    for (let j = 0; j < matrix.length; j++) {
      // if(i===0&&j===0) matrix[i][j]=copy[matrix.length-1][0]
      // if(i===0&&j===1) matrix[i][j]=copy[matrix.length-2][0]
      // if(i===0&&j===2) matrix[i][j]=copy[matrix.length-3][0]
      // if(i===1&&j===0) matrix[i][j]=copy[2][1]
      // if(i===1&&j===1) matrix[i][j]=copy[1][1]
      // if(i===1&&j===2) matrix[i][j]=copy[0][1]
      // if(i===2&&j===0) matrix[i][j]=copy[2][2]
      // if(i===2&&j===1) matrix[i][j]=copy[1][2]
      // if(i===2&&j===2) matrix[i][j]=copy[0][2]
      console.log('inner', inner);
      matrix[i][j] = copy[outer][inner];
      outer--;
    }
    inner++;
  }
  // return [matrix, copy]
}

console.log(
  'rotate',
  rotate([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

// about 2D arrays and inputs , the are very often considered n^2 so 
// going one is alrady O(n^2)
// In the case of a 2D matrix, it’s common to define the input size as n² if the matrix 
// is of size n x n, because that’s the total number of elements in the matrix. This is 
// why we say the time complexity is O(n²) when we need to visit every element in the matrix.

// However, if we were to consider the matrix as one long array of size n² (by concatenating 
//   all the rows, for example), then we could indeed say that the time complexity is O(n),
//    where n is the total number of elements in the “long array”.

// Both are valid ways to describe the time complexity, and the choice between them often 
// depends on the context and how the problem is framed. In the context of 2D matrices, 
// it’s more common to use the former approach (O(n²) for visiting every element), but the 
// latter approach (O(n) for a “long array”) is equally valid if we consider the 
// matrix as a single, flat structure.
