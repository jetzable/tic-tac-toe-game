// Store game status
const statusDisplay = document.querySelector(".game--status");

// Variables that we will use to track the game state throught the game
let gameActive = true; // To pause the game in case of an end scenario
let currentPlayer = "X"; // Current player
let gameState = ["", "", "", "", "", "", "", "", ""]; // Current game state to validate cells

// Messages displayed to the user
const winningMessage = () => `<p><span>Player</span><span class="player">${currentPlayer}</span><span>has won!</span></p>`;
const drawMessage = () => `<p><span>Game ended in a</span><span class="player">draw!</span></p>`;
const currentPlayerTurn = () => `<p><span>It's</span><span class="player">${currentPlayer}'s</span><span>turn</span></p>`;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

statusDisplay.innerHTML = currentPlayerTurn(); // Inital message to let the players know whose turn it is

function handleCellPlayed(clickedCell, clickedCellIndex) {
  /* Update the internal game state to reflect the played move,
    as well as update the user interface to reflect the played move */
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer === 'X' ?
    `<i class="fa-solid fa-xmark"></i>` : `<i class="fa-solid fa-circle"></i>`;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
          continue;
      }
      if (a === b && b === c) {
          roundWon = true;
          break
      }
  }
if (roundWon) {
      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
      return;
  }
/* Check if there are any values in our game state array
  that are still not populated with a player sign */
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
      statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      return;
  }
  /* Up to this point no one won the game yet,
    and that there are still moves to be played,
    so continue by changing the current player. */
  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  /* Save the clicked html element in a variable for further use */
  const clickedCell = clickedCellEvent.target;
  /* Grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in the grid.
    The getAttribute will return a string value, parse it to an integer(number) */
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  /* Check whether the call has already been played, or if the game is paused.
    If either of those is true, ignore the click. */
  if (gameState[clickedCellIndex] !== "" || !gameActive) return;
  /* If everything if in order, proceed with the game flow */
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell')
             .forEach(cell => cell.innerHTML = "");
}

// Event listeners to the actual game cells, as well as a restart button
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
