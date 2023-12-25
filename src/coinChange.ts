// sol 2, backtracking, time complexity is O(n*n)
function coinChange(coins: number[], amount: number): number {
  coins.sort((a, b) => b - a);
  // return coins
  let min = Infinity;
  //   this is how you stop bactracking function by throwing an error
  // inttuition was that since array is sorted in descending ored the first solution
  // should be the correct one - it is not the case apparently using biiger coins first will
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
