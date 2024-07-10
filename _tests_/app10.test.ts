import { numIdenticalPairs } from '../src/app10';

it('should return 0 when the input array is empty', () => {
  const nums: number[] = [];
  const result = numIdenticalPairs(nums);
  expect(result).toBe(0);
});
