/**
 * отрисовка поля
 * @param field {number[][]} - состояние поля
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисовано поле
 * @param onCellClick {(x: number, y: number) => void}
 * @returns void
 */

export function drawField(
  htmlElement: HTMLElement,
  field: number[][],
  newField: number[][],
  onCellClick: (x: number, y: number) => void
): void {
  const rowIterator = (row: number[], rowIndex: number) => {
    const rowResult = `<tr>${row
      .map((cell, columnIndex) => {
        if (cell === 1) {
          return `<td 
        data-x=${columnIndex}
        data-y=${rowIndex}
        class="cell alive"></td>`;
        }
        return `<td 
      data-x=${columnIndex}
      data-y=${rowIndex}
      class="cell dead"></td>`;
      })
      .join("")}</tr>`;
    return rowResult;
  };

  const table = document.createElement("table");
  table.innerHTML = field.map(rowIterator).join("");

  table.querySelectorAll("td").forEach((el) => {
    const cellIndex = Number(el.dataset.x);
    const rowIndex = Number(el.dataset.y);
    const cellClasses = el.className;

    if (newField[rowIndex][cellIndex] === 1 && cellClasses.includes("dead")) {
      el.className = el.className.replace("dead", "shouldBorn");
    } else if (
      newField[rowIndex][cellIndex] === 0 &&
      cellClasses.includes("alive")
    ) {
      el.className = el.className.replace("alive", "shouldDie");
    }
    return el;
  });

  if (htmlElement.firstChild) {
    htmlElement.removeChild(htmlElement.firstChild);
  }
  htmlElement.appendChild(table);

  table.addEventListener("click", (ev) => {
    const clickedElement = ev.target as HTMLTextAreaElement;
    if (clickedElement !== null && clickedElement.tagName === "TD") {
      const x = clickedElement.getAttribute("data-x");
      const y = clickedElement.getAttribute("data-y");
      if (Number(x) >= 0 && Number(y) >= 0) {
        onCellClick(Number(x), Number(y));
      }
    }
  });
}
