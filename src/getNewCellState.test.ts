import { getNewCellState } from "./getNewCellState";

function randomInteger(min: number, max: number): number {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

describe("getNewCellState", () => {
  it("should return valid new state", () => {
    expect(getNewCellState(0, randomInteger(0, 2))).toBe(0);
    expect(getNewCellState(0, randomInteger(4, 8))).toBe(0);
    expect(getNewCellState(0, 3)).toBe(1);

    expect(getNewCellState(1, randomInteger(0, 1))).toBe(0);
    expect(getNewCellState(1, randomInteger(4, 8))).toBe(0);
    expect(getNewCellState(1, 2)).toBe(1);
    expect(getNewCellState(1, 3)).toBe(1);
  });
});
