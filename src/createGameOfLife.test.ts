import { createGameOfLife } from "./createGameOfLife";
import { drawField } from "./drawField";

jest.mock("./drawField");

const standardGame = (el: HTMLElement) => {
  createGameOfLife(el);
  (el.querySelector("input[name='columns']") as HTMLInputElement).value = "5";
  (el.querySelector("input[name='strings']") as HTMLInputElement).value = "5";
  (el.querySelector("input[name='time']") as HTMLInputElement).value = "10";
};

const invalidGame = (el: HTMLElement) => {
  createGameOfLife(el);
  (el.querySelector("input[name='columns']") as HTMLInputElement).value = "-5";
  (el.querySelector("input[name='strings']") as HTMLInputElement).value = "-5";
  (el.querySelector("input[name='time']") as HTMLInputElement).value = "10";
};

describe("createGameOfLife", () => {
  let element: HTMLElement;
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
      expect(
        (element.querySelector("button[name='Start']") as HTMLButtonElement)
          .innerHTML
      ).toBe("Start");
      expect(element.querySelector(".field-wrapper")).toBeTruthy();
    });
    it("changes button name on click", () => {
      standardGame(element);
      const button = element.querySelector("button[name='Start']");

      expect((button as HTMLButtonElement).innerHTML).toBe("Start");
      (button as HTMLButtonElement).click();
      expect((button as HTMLButtonElement).innerHTML).toBe("Stop");
      (button as HTMLButtonElement).click();
      expect((button as HTMLButtonElement).innerHTML).toBe("Start");
      (button as HTMLButtonElement).click();
      expect((button as HTMLButtonElement).innerHTML).toBe("Stop");
    });
    it("run alert when invalid params", () => {
      invalidGame(element);
      const button = element.querySelector("button[name='Start']");

      (button as HTMLButtonElement).click();

      expect(window.alert).toHaveBeenCalledWith("Недопустимый размер поля");
    });
    it("run alert when reset game", () => {
      standardGame(element);
      const resetButton = element.querySelector("button[name='Reset']");

      (resetButton as HTMLButtonElement).click();

      expect(window.alert).toHaveBeenCalledWith("Игра сброшена");
    });
    it("draws field", () => {
      (drawField as jest.Mock).mockImplementation(
        (fieldEl: HTMLElement, field: number[][]) => {
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      standardGame(element);
      (element.querySelector(
        "button[name='Start']"
      ) as HTMLButtonElement).click();

      expect(
        (element.querySelector(".field-wrapper") as HTMLElement).innerHTML
      ).toBeTruthy();
    });
    it("redraw field on interaction with it", () => {
      let onCellClick: (x: number, y: number) => void;
      (drawField as jest.Mock).mockImplementation(
        (
          fieldEl: HTMLElement,
          field: number[][],
          newField: number[][],
          cellClickHandler: (x: number, y: number) => void
        ) => {
          onCellClick = cellClickHandler;
          newField = field;
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      standardGame(element);
      const button = element.querySelector(
        "button[name='Start']"
      ) as HTMLButtonElement;
      button.click();
      expect(
        (element.querySelector(".field-wrapper") as HTMLElement).innerHTML
      ).toBe(
        `drawField(${JSON.stringify([
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ])})`
      );
      onCellClick(0, 0);
      expect(
        (element.querySelector(".field-wrapper") as HTMLElement).innerHTML
      ).toBe(
        `drawField(${JSON.stringify([
          [1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ])})`
      );
      onCellClick(0, 0);
      expect(
        (element.querySelector(".field-wrapper") as HTMLElement).innerHTML
      ).toBe(
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
