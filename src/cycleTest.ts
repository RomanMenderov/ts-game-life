export function ifCycle(
  memory: string[],
  currentField: number[][],
  nextField: number[][]
): boolean {
  if (
    memory.includes(JSON.stringify(currentField)) &&
    memory.includes(JSON.stringify(nextField))
  ) {
    return true;
  }
  return false;
}
