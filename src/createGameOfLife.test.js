/* eslint-disable no-param-reassign */
import { createGameOfLife } from "./createGameOfLife";
import { drawField } from "./drawField";

jest.mock("./drawField");

const standardGame = (el) => {
  createGameOfLife(el);
  el.querySelector("input[name='columns']").value = 5;
  el.querySelector("input[name='strings']").value = 5;
  el.querySelector("input[name='time']").value = 10;
};

describe("createGameOfLife", () => {
  let element;
  const originalAlert = window.alert;

  beforeEach(() => {
    element = document.createElement("div");
    window.alert = jest.fn();
    jest.spyOn(global.Math, "random").mockReturnValue(0);
  });
  afterEach(() => {
    jest.resetAllMocks();
    window.alert = originalAlert;
  });
  describe("UI", () => {
    it("creates Start button and field", () => {
      standardGame(element);
      expect(element.querySelector("button")).toBeTruthy();
      expect(element.querySelector("input[name='columns']")).toBeTruthy();
      expect(element.querySelector("input[name='strings']")).toBeTruthy();
      expect(element.querySelector("button").innerText).toBe("Start");
      expect(element.querySelector(".field-wrapper")).toBeTruthy();
    });
    it("changes button name on click", () => {
      standardGame(element);
      const button = element.querySelector("button");
      if (button !== null) {
        expect(button.innerText).toBe("Start");
        button.click();
        expect(button.innerText).toBe("Stop");
        button.click();
        expect(button.innerText).toBe("Start");
        button.click();
        expect(button.innerText).toBe("Stop");
      }
    });
    it("draws field", () => {
      drawField.mockImplementation((fieldEl, field) => {
        fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
      });
      standardGame(element);
      element.querySelector("button").click();

      expect(element.querySelector(".field-wrapper").innerHTML).toBeTruthy();
    });
    it("redraw field on interaction with it", () => {
      let onCellClick;
      drawField.mockImplementation(
        (fieldEl, field, newField, cellClickHandler) => {
          onCellClick = cellClickHandler;
          newField = field;
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      standardGame(element);
      const button = element.querySelector("button");
      button.click();
      expect(element.querySelector(".field-wrapper").innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ])})`
      );
      onCellClick(0, 0);
      expect(element.querySelector(".field-wrapper").innerHTML).toBe(
        `drawField(${JSON.stringify([
          [1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ])})`
      );
      onCellClick(0, 0);
      expect(element.querySelector(".field-wrapper").innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ])})`
      );
    });
  });
});
