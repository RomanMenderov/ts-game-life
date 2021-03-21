# Приложение по игре Жизнь исполненное на TypeScript

### (Переделано из JS версии ![Исходник](https://github.com/vvscode/ts--env-setup-example) )

![PR Sanity Check](https://github.com/RomanMenderov/ts-game-life/workflows/PR%20Sanity%20Check/badge.svg)
![Add codesandbox link](https://github.com/RomanMenderov/ts-game-life/workflows/Add%20codesandbox%20link/badge.svg)
[![codecov](https://codecov.io/gh/RomanMenderov/ts-game-life/branch/tsGameOfLife/graph/badge.svg?token=TWVNITZ00C)](https://codecov.io/gh/RomanMenderov/ts-game-life)

Реализовано:

- [x] механизм изменения размеров поля (два input поля (type number)), в тч на лету (при увеличении заполнение мертвыми клетками, при уменьшении просто уничтожения ячеек);
- [x] реализован механизм изменения скорости игры (input type=range);
- [x] реализована подсветка клеток, которые являясь живыми должны умереть в следующем поколени:
- [x] мертвые - белый цвет
  - [x] живые - черный
  - [x] обреченные на смерть - серые
  - [x] рождающиеся - золотой
