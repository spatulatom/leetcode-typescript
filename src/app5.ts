// backtracking on a 1D array:
function permute0(str:string[], l:number, r:number) {
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

function permute(str: string[], arr: string[] = [], set: Set<string> = new Set()) {
    if (arr.length === str.length) {
        set.add(arr.join(''));
        console.log(arr.join(''), arr);
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


const str = "AAB";
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

function exist(board: string[][], word: string): boolean {
    const string2 = board.flat();
    const word2 = word.split('');
    let rows = 0;
  
    let match = '';
    for (let i = 0; i < string2.length; i++) {
      match += string2[i];
      const partial = word2.slice(0, match.length).join('');
      if (match === word)
        if (match !== partial) {
          match = '';
        }
    }
  
    return true;
  
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
