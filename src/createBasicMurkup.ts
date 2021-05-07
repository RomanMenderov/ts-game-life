// const minTimeScale = 1;
// const maxTimeScale = 10;
export const basicMurkup = `
<div class="field-wrapper"></div>
<div class="special-info"></div>
<div><span>Легенда:</span><br>
  <div class="cell legend-cell alive"></div><span>- Живая клетка</span>
  &nbsp;
  <div class="cell legend-cell dead"></div><span>- Мертвая клетка</span>
  &nbsp;
  <div class="cell legend-cell shouldBorn"></div><span>- Рождающая клетка</span>
  &nbsp;
  <div class="cell legend-cell shouldDie"></div>
  <span>- Умирающая клетка</span></div>
  <input type="number" name="columns" 
  placeholder="Количество столбцов" value="10">
  <input type="number" name="strings" 
  placeholder="Количество строк" value="10">
  <span>&nbsp; Время хода &nbsp;</span>
  <input type="range" name="time">
  <input type="text" name="time-value">
  <span>&nbsp; секунд &nbsp;</span>
  <span><br>Рандомные клетки</span>
  <input type="checkbox" name="randomiser" placeholder="Randomiser">
  <button name="Start">Start</button><button name="Reset">Reset</button>
`;
