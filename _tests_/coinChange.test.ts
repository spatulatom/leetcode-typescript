import { coinChange } from "../src/coinChange";

it('should return correct minimum number of coins when given a valid amount', () => {
    const coins = [1, 2, 5];
    const amount = 11;
    const result = coinChange(coins, amount);
    expect(result).toBe(3);
  });