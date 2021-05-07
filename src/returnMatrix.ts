export function createMatrix(
  lengthX: number,
  lengthY: number,
  randomFlag: boolean
): number[][] {
  const matrix = [];
  const randomiser = () => {
    if (randomFlag) {
      return Math.round(Math.random());
    }
    return 0;
  };
  for (let i = 0; i < lengthY; i++) {
    const row = [];
    for (let j = 0; j < lengthX; j++) {
      row.push(randomiser());
    }
    matrix.push(row);
  }
  return matrix;
}

export function updateMatrix(
  oldField: number[][],
  newX: number,
  newY: number
): number[][] {
  const oldX = oldField[0].length;
  const oldY = oldField.length;
  if (oldY > newY) {
    oldField.splice(newY);
  } else if (oldY < newY) {
    for (let i = 0; i < newY - oldY; i++) {
      const row = [];
      for (let j = 0; j < oldX; j++) {
        row.push(0);
      }
      oldField.push(row);
    }
  }

  if (oldX > newX) {
    oldField.map((el) => el.splice(newX));
  } else if (oldX < newX) {
    oldField.forEach((el) => {
      for (let i = 0; i < newX - oldX; i++) {
        el.push(0);
      }
    });
  }

  return oldField;
}
