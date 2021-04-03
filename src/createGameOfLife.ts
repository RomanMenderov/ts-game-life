import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";

/**
 * Создание игры Жизнь
 * @param sizeX {number} - число колонок
 * @param sizeY {number} - число строк
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисована игра
 * @returns void
 */
export function createGameOfLife(htmlElement: HTMLElement): void {
  let gameIsRunning = false;
  let timer: number;
  let field: number[][];
  let newField: number[][];
  let sizeX: number;
  let sizeY: number;
  // Создать блок для поля
  // Создать кнопку управления игрой

  const fieldWrapper = document.createElement("div");
  fieldWrapper.className = "field-wrapper";
  htmlElement.appendChild(fieldWrapper);

  const inputX = document.createElement("input");
  inputX.type = "number";
  inputX.name = "columns";
  inputX.placeholder = "Количество столбцов";
  htmlElement.appendChild(inputX);

  const inputY = document.createElement("input");
  inputY.type = "number";
  inputY.name = "strings";
  inputY.placeholder = "Количество строк";
  htmlElement.appendChild(inputY);

  const timeScale = document.createElement("input");
  timeScale.type = "range";
  timeScale.name = "time";
  timeScale.min = "1";
  timeScale.max = "10";
  timeScale.value = "5";
  htmlElement.appendChild(timeScale);

  const button = document.createElement("button");
  button.innerText = "Start";
  htmlElement.appendChild(button);

  function createMatrix(lengthX: number, lengthY: number): number[][] {
    const matrix = [];
    for (let i = 0; i < lengthY; i++) {
      const row = [];
      for (let j = 0; j < lengthX; j++) {
        row.push(Math.round(Math.random()));
      }
      matrix.push(row);
    }
    return matrix;
  }

  function updateMatrix(
    oldField: number[][],
    newX: number,
    newY: number
  ): number[][] {
    const oldX = oldField[0].length;
    const oldY = oldField.length;
    if (oldY > newY) {
      oldField.splice(newY - 1);
    } else if (oldY < newY) {
      for (let i = 0; i < newY - oldY; i++) {
        const row = [];
        for (let j = 0; j < newX; j++) {
          row.push(0);
        }
        oldField.push(row);
      }
    }

    if (oldX > newX) {
      oldField.map((el) => el.splice(newX - 1));
    } else if (oldX < newX) {
      oldField.forEach((el) => {
        for (let i = 0; i < newX - oldX; i++) {
          el.push(0);
        }
      });
    }

    return oldField;
  }

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    newField = getNextState(field);
    drawField(fieldWrapper, field, newField, cellClickHandler);
  };

  // Отрисовать поле заданного размера

  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле
  function stopGame() {
    gameIsRunning = false;
    button.innerText = "Start";
    // При клике на кнопке `Stop` остановить таймер
    clearInterval(timer);
  }
  function startGame() {
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    gameIsRunning = true;
    button.innerText = "Stop";
    sizeX = Number(inputX.value);
    sizeY = Number(inputY.value);
    field = createMatrix(sizeX, sizeY);
    newField = getNextState(field);
    drawField(fieldWrapper, field, newField, cellClickHandler);
    // - запустить таймер для обновления поля

    function gameRunning() {
      // В таймере обновления поля
      // - посчитать новое состояние поля
      // - отрисовать новое состояние поля
      // - проверить, что есть живые клетки
      // - если живых клеток нет
      //    - остановить таймер
      //    - вывести сообщение
      const sizeXNew = Number(inputX.value);
      const sizeYNew = Number(inputY.value);
      if (sizeXNew !== sizeX || sizeYNew !== sizeY) {
        field = updateMatrix(field, sizeXNew, sizeYNew);
        sizeX = sizeXNew;
        sizeY = sizeYNew;
      }
      field = getNextState(field);
      newField = getNextState(field);

      drawField(fieldWrapper, field, newField, cellClickHandler);
      if (!isAnyoneAlive(field)) {
        // eslint-disable-next-line no-alert
        alert("Death on the block");
        stopGame();
      }
    }

    timer = window.setInterval(() => {
      gameRunning();
    }, Number(timeScale.value) * 1000);
  }

  button.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });
}
