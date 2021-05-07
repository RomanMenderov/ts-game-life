// Запуск игры
//
// - создать элемент и добавить его на страницу
// - создать на этом элементе игру с помощью `createGameOfLife` с размерами поля x / y
import "./css/index.css";
import { createGameOfLife } from "./createGameOfLife";

// - для проверки своего кода можно создать еще один элемент и создать вторую игру на этой же странице
const gameWrapper1 = document.createElement("div");
const gameWrapper2 = document.createElement("div");

document.body.appendChild(gameWrapper1);
document.body.appendChild(gameWrapper2);

createGameOfLife(gameWrapper1);
createGameOfLife(gameWrapper2);
