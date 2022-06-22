export function playerValue(player) {
  let playerValue;
  if (player === false) playerValue = 'X';
  if (player === true) playerValue = 'O';
  console.log(playerValue);
  return playerValue;
}
