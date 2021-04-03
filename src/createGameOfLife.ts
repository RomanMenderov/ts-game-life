import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";
import { createMatrix, updateMatrix } from "./returnMatrix";

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
  let ticTime: number;
  let field: number[][];
  let newField: number[][];
  let sizeX: number;
  let sizeY: number;
  // Создать блок для поля
  // Создать кнопку управления игрой

  const fieldWrapper = document.createElement("div");
  fieldWrapper.className = "field-wrapper";
  htmlElement.appendChild(fieldWrapper);

  const legend = document.createElement("div");
  legend.innerHTML = `<span>Легенда:</span><br/>
  <div class='cell legend-cell alive'></div><span>- Живая клетка</span>
  &nbsp;
  <div class='cell legend-cell dead'></div><span>- Мертвая клетка</span>
  &nbsp;
  <div class='cell legend-cell shouldBorn'></div><span>- Рождающая клетка</span>
  &nbsp;
  <div class='cell legend-cell shouldDie'></div>
  <span>- Умирающая клетка</span>`;
  htmlElement.appendChild(legend);

  const inputX = document.createElement("input");
  inputX.type = "number";
  inputX.name = "columns";
  inputX.placeholder = "Количество столбцов";
  inputX.value = "10";
  htmlElement.appendChild(inputX);

  const inputY = document.createElement("input");
  inputY.type = "number";
  inputY.name = "strings";
  inputY.placeholder = "Количество строк";
  inputY.value = "10";
  htmlElement.appendChild(inputY);

  const timeScale = document.createElement("input");
  timeScale.type = "range";
  timeScale.name = "time";
  timeScale.min = "1";
  timeScale.max = "10";
  timeScale.value = "5";
  htmlElement.appendChild(timeScale);

  const inputRText = document.createElement("span");
  inputRText.innerHTML = "<br/>Рандомные клетки";
  htmlElement.appendChild(inputRText);

  const inputR = document.createElement("input");
  inputR.type = "checkbox";
  inputR.name = "randomiser";
  inputR.placeholder = "Randomiser";
  htmlElement.appendChild(inputR);

  const button = document.createElement("button");
  button.innerText = "Start";
  htmlElement.appendChild(button);

  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset";
  resetButton.name = "Reset";
  htmlElement.appendChild(resetButton);

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    newField = getNextState(field);
    drawField(fieldWrapper, field, newField, cellClickHandler);
  };

  // Отрисовать поле заданного размера
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле

  function stopGame(massage?: string) {
    const myMassage = massage || "Игра приостановлена";
    gameIsRunning = false;
    // - поменять надпись на `start`
    button.innerText = "Start";
    clearInterval(timer);
    // eslint-disable-next-line no-alert
    alert(myMassage);
  }

  function resetGame() {
    const myMassage = "Игра сброшена";
    gameIsRunning = false;
    // - поменять надпись на `start`
    button.innerText = "Start";
    clearInterval(timer);
    // eslint-disable-next-line no-alert
    alert(myMassage);
    field = [[]];
  }

  function startGame() {
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    ticTime = Number(timeScale.value) * 1000;
    sizeX = Number(inputX.value);
    sizeY = Number(inputY.value);
    if (sizeX <= 0 || sizeY <= 0) {
      stopGame("Недопустимый размер поля");
      return;
    }
    gameIsRunning = true;
    button.innerText = "Stop";

    if (!field || JSON.stringify(field) === "[[]]") {
      field = createMatrix(sizeX, sizeY, inputR.checked);
    }

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
        if (sizeXNew <= 0 || sizeYNew <= 0) {
          stopGame("Недопустимый размер нового поля");
          return;
        }
        field = updateMatrix(field, sizeXNew, sizeYNew);
        sizeX = sizeXNew;
        sizeY = sizeYNew;
      }
      if (Number(timeScale.value) * 1000 !== ticTime) {
        // eslint-disable-next-line no-use-before-define
        changeGameSpeed();
      }
      field = getNextState(field);
      newField = getNextState(field);

      drawField(fieldWrapper, field, newField, cellClickHandler);
      if (!isAnyoneAlive(field)) {
        stopGame("Все ячейки погибли");
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

  button.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });

  resetButton.addEventListener("click", () => {
    resetGame();
  });
}
