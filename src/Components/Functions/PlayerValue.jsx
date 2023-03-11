export function playerValue(player) {
  let playerValue;
  if (player === true) playerValue = 'X';
  if (player === false) playerValue = 'O';
  console.log(playerValue);
  return playerValue;
}
