export function playerValue(player) {
  let playerValue;
  if (player === 'Player 1') playerValue = 'X';
  if (player === 'Player 2') playerValue = 'O';
  console.log(playerValue);
  return playerValue;
}
