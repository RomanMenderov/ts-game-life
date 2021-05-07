import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";
import { createMatrix, updateMatrix } from "./returnMatrix";
import { basicMurkup } from "./createBasicMurkup";
import { ifCycle } from "./cycleTest";
/**
 * Создание игры Жизнь
 * @param sizeX {number} - число колонок
 * @param sizeY {number} - число строк
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисована игра
 * @returns void
 */
export function createGameOfLife(htmlElement: HTMLElement): void {
  const basicTimeMaxLimit = "10";
  const basicTimeMinLimit = "1";
  let gameIsRunning = false;
  let memory: string[];
  let timer: number;
  let ticTime: number;
  let field: number[][];
  let newField: number[][];
  let sizeX: number;
  let sizeY: number;
  // Создать блок для поля
  // Создать кнопку управления игрой

  htmlElement.innerHTML = basicMurkup;
  const fieldWrapper = htmlElement.querySelector("div.field-wrapper");

  const inputX = htmlElement.querySelector("input[name = 'columns']");

  const inputY = htmlElement.querySelector("input[name = 'strings']");

  const timeScale = htmlElement.querySelector("input[name = 'time']");
  (timeScale as HTMLInputElement).min = basicTimeMinLimit;
  (timeScale as HTMLInputElement).max = basicTimeMaxLimit;

  const inputR = htmlElement.querySelector("input[name = 'randomiser']");

  const button = htmlElement.querySelector("button[name = 'Start']");

  const resetButton = htmlElement.querySelector("button[name = 'Reset']");

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    newField = getNextState(field);
    drawField(fieldWrapper as HTMLElement, field, newField, cellClickHandler);
  };

  // Отрисовать поле заданного размера
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле

  function stopGame(massage?: string) {
    const myMassage = massage || "Игра приостановлена";
    gameIsRunning = false;
    // - поменять надпись на `start`
    (button as HTMLButtonElement).innerHTML = "Start";
    clearInterval(timer);
    alert(myMassage);
  }

  function resetGame() {
    const myMassage = "Игра сброшена";
    gameIsRunning = false;
    // - поменять надпись на `start`
    (button as HTMLButtonElement).innerHTML = "Start";
    clearInterval(timer);
    alert(myMassage);
    field = [[]];
  }

  function startGame() {
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    ticTime = Number((timeScale as HTMLInputElement).value) * 1000;
    sizeX = Number((inputX as HTMLInputElement).value);
    sizeY = Number((inputY as HTMLInputElement).value);
    if (sizeX <= 0 || sizeY <= 0) {
      stopGame("Недопустимый размер поля");
      return;
    }
    gameIsRunning = true;

    memory = ["", ""];

    (button as HTMLButtonElement).innerHTML = "Stop";

    if (!field || JSON.stringify(field) === "[[]]") {
      field = createMatrix(sizeX, sizeY, (inputR as HTMLInputElement).checked);

      if (!(inputR as HTMLInputElement).checked) {
        drawField(fieldWrapper as HTMLElement, field, field, cellClickHandler);
        stopGame("Настройте свою игру и нажмите start");
        return;
      }
    }

    newField = getNextState(field);
    drawField(fieldWrapper as HTMLElement, field, newField, cellClickHandler);
    // - запустить таймер для обновления поля

    function gameRunning() {
      // В таймере обновления поля
      // - посчитать новое состояние поля
      // - отрисовать новое состояние поля
      // - проверить, что есть живые клетки
      // - если живых клеток нет
      //    - остановить таймер
      //    - вывести сообщение
      const sizeXNew = Number((inputX as HTMLInputElement).value);
      const sizeYNew = Number((inputY as HTMLInputElement).value);
      if (sizeXNew !== sizeX || sizeYNew !== sizeY) {
        if (sizeXNew <= 0 || sizeYNew <= 0) {
          stopGame("Недопустимый размер нового поля");
          return;
        }
        field = updateMatrix(field, sizeXNew, sizeYNew);
        sizeX = sizeXNew;
        sizeY = sizeYNew;
      }
      if (Number((timeScale as HTMLInputElement).value) * 1000 !== ticTime) {
        // eslint-disable-next-line no-use-before-define
        changeGameSpeed();
      }
      field = getNextState(field);
      newField = getNextState(field);

      drawField(fieldWrapper as HTMLElement, field, newField, cellClickHandler);
      if (!isAnyoneAlive(field)) {
        stopGame("Все ячейки погибли");
        return;
      }
      if (!ifCycle(memory, field, newField)) {
        memory = [JSON.stringify(field), JSON.stringify(newField)];
      } else {
        stopGame("Игра зациклена");
      }
    }

    timer = window.setInterval(() => {
      gameRunning();
    }, ticTime);
  }

  function changeGameSpeed() {
    gameIsRunning = false;

    clearInterval(timer);
    startGame();
  }

  (button as HTMLButtonElement).addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });

  (resetButton as HTMLButtonElement).addEventListener("click", () => {
    resetGame();
  });
}
