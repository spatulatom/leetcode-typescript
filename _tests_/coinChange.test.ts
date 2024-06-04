import { coinChange } from "../src/coinChange";

it('should return correct minimum number of coins when given a valid amount', () => {
    const coins = [1, 2, 5];
    const amount = 11;
    const result = coinChange(coins, amount);
    expect(result).toBe(3);
  });

  it('should return -1 when coins array is empty', () => {
    const coins:any = [];
    const amount = 11;
    const result = coinChange(coins, amount);
    expect(result).toBe(-1);
  });

  it('should handle cases where amount is zero', () => {
    const coins = [1, 2, 5];
    const amount = 0;
    const result = coinChange(coins, amount);
    expect(result).toBe(0);
  });

  it('should handle cases where only one type of coin is needed', () => {
    const coins = [2];
    const amount = 6;
    const result = coinChange(coins, amount);
    expect(result).toBe(3);
  });