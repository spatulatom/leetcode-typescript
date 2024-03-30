import { hasGroupsSizeX } from "../src/app9";

it('should return true when deck has multiple groups of cards with the same integer value', () => {
    const deck = [1, 1, 2, 2, 3, 3];
    const result = hasGroupsSizeX(deck);
    expect(result).toBe(true);
  });