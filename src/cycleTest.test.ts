import { ifCycle } from "./cycleTest";

describe("ifCycle", () => {
  it("is a function", () => {
    expect(typeof ifCycle).toBe("function");
  });

  it("returns `false` for no histiory field", () => {
    expect(ifCycle(["", ""], [[2]], [[1]])).toBe(false);
  });

  it("returns `true` this and next field in memory", () => {
    const nowField = [
      [1, 2],
      [2, 1],
    ];
    const nextField = [
      [2, 1],
      [2, 1],
    ];
    const memory = [JSON.stringify(nowField), JSON.stringify(nextField)];
    expect(ifCycle(memory, nowField, nextField)).toBe(true);
  });
});
