export function getNewCellState(
  currentCellState: number,
  numOfAliveNeighbours: number
): number {
  if (
    numOfAliveNeighbours === 3 ||
    (numOfAliveNeighbours === 2 && currentCellState === 1)
  ) {
    return 1;
  }
  return 0;
}
