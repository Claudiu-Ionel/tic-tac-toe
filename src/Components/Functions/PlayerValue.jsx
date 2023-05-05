export function playerValue(player) {
  let playerValue;
  if (player === true) playerValue = 'X';
  if (player === false) playerValue = 'O';
  return playerValue;
}
