export function playerValue(player: Boolean) : string {
  let playerValue: string = "";
  if (player === true) playerValue = 'X';
  if (player === false) playerValue = 'O';
  return playerValue;
}
