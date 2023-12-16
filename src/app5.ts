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
// sol 1
function setZeroes(matrix: number[][]): void {
  // traverse matrix and mark we are zeros
  const zeros: { [key: string]: string } = {};
  let key = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      // console.log(i, j)
      if (matrix[i][j] === 0) {
        console.log(i, j);
        zeros[key] = `${[i]}${[j]}`;
        key++;
      }
    }
  }
  const zerosArr = Object.values(zeros);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (`${[i]}${[j]}` === zerosArr[0]) {
        console.log('here');
      }
    }
  }
}

console.log(
  'setZeroes',
  setZeroes([
    [0, 1, 2, 0],
    [3, 4, 0, 2],
    [1, 3, 1, 5],
  ])
);
