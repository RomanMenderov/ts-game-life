import { createMatrix, updateMatrix } from "./returnMatrix";

describe("work with matrix", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(1);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("creates matrix correcntly", () => {
    expect(JSON.stringify(createMatrix(2, 2, false))).toBe("[[0,0],[0,0]]");
    expect(JSON.stringify(createMatrix(2, 2, true))).toBe("[[1,1],[1,1]]");
    expect(JSON.stringify(createMatrix(2, 3, true))).toBe(
      "[[1,1],[1,1],[1,1]]"
    );
    expect(JSON.stringify(createMatrix(3, 2, true))).toBe("[[1,1,1],[1,1,1]]");
  });
  it("update matrix correcntly", () => {
    expect(
      JSON.stringify(
        updateMatrix(
          [
            [0, 0],
            [0, 0],
          ],
          3,
          3
        )
      )
    ).toBe("[[0,0,0],[0,0,0],[0,0,0]]");
    expect(
      JSON.stringify(
        updateMatrix(
          [
            [0, 0, 1],
            [0, 0, 1],
          ],
          2,
          2
        )
      )
    ).toBe("[[0,0],[0,0]]");
  });
});
