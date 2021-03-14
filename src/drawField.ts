/**
 * отрисовка поля
 * @param field {number[][]} - состояние поля
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисовано поле
 * @param onCellClick {(x: number, y: number) => void}
 * @returns void
 */

export function drawField(htmlElement:HTMLElement,
   field:number[][], newField:number[][],
     onCellClick:(x: number, y: number) => void):void {
  const rowIterator = (row:number[], rowIndex:number) => {
    const rowResult = (`<tr>${row
      .map((cell, columnIndex) => {
        if (cell === 1) {
          return `<td 
        data-x=${columnIndex}
        data-y=${rowIndex}
        class="cell alive" 
        style="background-color:#FA58D0; height:10px; width:10px;"></td>`;
        }
        return `<td 
      data-x=${columnIndex}
      data-y=${rowIndex}
      class="cell dead" 
      style="background-color:#FFFFFF; height:10px; width:10px;
       border:1px solid black"></td>`;
      })
      .join("")}</tr>`);
      return rowResult;
   };

   // const table = `<table border=1>${field.map(rowIterator).join("")}</table>`;
   const table = document.createElement('table');
   table.innerHTML = field.map(rowIterator).join("");

   table.querySelectorAll('td').forEach((el)=>{
     const cellIndex = Number(el.dataset.x);
     const rowIndex = Number(el.dataset.y);
     const cellClasses = el.className;

     if(newField[rowIndex][cellIndex] === 1 && cellClasses.includes('dead')){
       // eslint-disable-next-line no-param-reassign
      el.className = el.className.replace('dead','shouldBorn');
     }
     else if(newField[rowIndex][cellIndex] === 0 
              && cellClasses.includes('alive')){
                // eslint-disable-next-line no-param-reassign
      el.className = el.className.replace('alive','shouldDie');
     }
     return el;
   });

  // const table = document.createElement('table');
  // table.innerHTML = field.map(rowIterator).join("");
  // eslint-disable-next-line no-param-reassign
  if(htmlElement.firstChild){
  htmlElement.removeChild(htmlElement.firstChild);
  }
  htmlElement.appendChild(table);

  

  table.addEventListener("click", (ev) => {
    const clickedElement = ev.target as HTMLTextAreaElement;
    if(clickedElement !== null && clickedElement.tagName === 'TD'){
    const x = clickedElement.getAttribute("data-x");
    const y = clickedElement.getAttribute("data-y");
    if (Number(x) >= 0 && Number(y) >= 0) {
      onCellClick(Number(x), Number(y));
    }}
  }); 
  
}
