import { playGame } from "./game";
import { ComputerPlayer, Player } from "./player";

/**
 * Resets the current HTML and add the containers for the players boards, and displays the turn player's name
 * @param {Player} player The turn player
 * @param {Player} opponent The opponent
 */
export function initializePage(player, opponent) {
  const turnPlayerDisplay = document.createElement("h1");
  turnPlayerDisplay.textContent = `${player.name}'s turn`;

  const playerBoard = document.createElement("div");
  playerBoard.id = `${player.name.replaceAll(" ", "-")}-board`;

  const enemyBoard = document.createElement("div");
  enemyBoard.id = `${opponent.name.replaceAll(" ", "-")}-board`;

  const boards = document.createElement("div");
  boards.id = "boards";
  boards.append(playerBoard, enemyBoard);

  const body = document.querySelector("body");
  // Reset the page
  body.replaceAllChildren();
  body.append(turnPlayerDisplay, boards);
}

/**
 * Render a player's board on screen with ships, misses, and hits
 * @param {Player} player The player who's board should be rendered
 * @param {Boolean} isOpponent Flag for determining whether this is the player's opponent's board or theirs
 */
export function renderPlayerBoard(player, isOpponent) {
  const boardContainer = document.querySelector(
    `#${player.name.replaceAll(" ", "-")}-board`
  );

  // Clear the board
  boardContainer.replaceAllChildren();

  renderCells(player, boardContainer, isOpponent);

  // Only render the ships of the turn player's board
  if (!isOpponent) {
    renderShips(player);
  }

  renderMisses(player);

  renderHits(player);
}

/**
 * Renders the board cells for the specified player
 * @param {Player} player Player who's board is board cells are to be rendered
 * @param {Element} DOMContainer DOM Element where the player's cells should be added
 * @param {Boolean} isOpponent flag to check if the board being rendered is the turn player's or the opponent's
 */
function renderCells(player, DOMContainer, isOpponent) {
  // For the column indices on screen
  const alphabetIndexes = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "H",
    7: "I",
    8: "J",
  };

  for (let i = 0; i < player.board.size + 1; i++) {
    // Create a row
    const boardRow = document.createElement("div");
    boardRow.classList.add("row");
    DOMContainer.append(boardRow);

    for (let j = 0; j < player.board.size + 1; j++) {
      // Create a cell
      const boardCell = document.createElement("div");

      // Top row of letter indices
      if (i === 0 && j !== 0) {
        boardCell.classList.add("index-cell");
        boardCell.textContent = alphabetIndexes[j - 1];

        // Empty top left corner cell
      } else if (i === 0 && j === 0) {
        boardCell.classList.add("index-cell");

        // Left column of number indices
      } else if (i !== 0 && j === 0) {
        boardCell.classList.add("index-cell");
        boardCell.textContent = i;

        // Normal game cell
      } else {
        boardCell.classList.add("cell");
        boardCell.dataset.row = i;
        boardCell.dataset.col = j;

        // Player should only click on the opponent's cells
        if (isOpponent) {
          boardCell.classList.add("clickable");
        }
      }

      boardRow.append(boardCell);
    }
  }
}

/**
 * Renders the ships on the board of the specified player
 * @param {Player} player Player who's ships are to be rendered
 */
function renderShips(player) {
  const ships = player.board.ships;

  // Give each cell that a ship is on the .ship class
  for (const obj of ships) {
    const shipCoordinates = obj.coordinates;

    for (const pair of shipCoordinates) {
      const cell = document.querySelector(
        `#${player.name.replaceAll(" ", "-")}-board [data-col='${
          pair[0] + 1
        }'][data-row='${pair[1] + 1}']`
      );

      cell.classList.add("ship");
    }
  }
}

/**
 * Renders the moves made by the opponent that resulted in a hit on the specified player's board
 * @param {Player} player Player who's board's hits are to be rendered
 */
function renderHits(player) {
  const hits = player.board.hits;

  for (const coordinate of hits) {
    const cell = document.querySelector(
      `#${player.name.replaceAll(" ", "-")}-board [data-col='${
        coordinate[0] + 1
      }'][data-row='${coordinate[1] + 1}']`
    );

    // Make the cell's hover effect disappear, since it is no longer a valid move
    cell.classList.remove("clickable");

    // Add the hit marker on the cell
    if (cell.childElementCount === 0) {
      const marker = document.createElement("div");
      marker.classList.add("hit");
      marker.classList.add("marker");
      cell.append(marker);
    }
  }
}

/**
 * Renders the moves made by the opponent that resulted in a miss on the specified player's board
 * @param {Player} player Player who's board's misses are to be rendered
 */
function renderMisses(player) {
  const misses = player.board.misses;

  for (const coordinate of misses) {
    const cell = document.querySelector(
      `#${player.name.replaceAll(" ", "-")}-board [data-col='${
        coordinate[0] + 1
      }'][data-row='${coordinate[1] + 1}']`
    );

    // Make the cell's hover effect disappear, since it is no longer a valid move
    cell.classList.remove("clickable");

    // Add the miss marker
    if (cell.childElementCount === 0) {
      const marker = document.createElement("div");
      marker.classList.add("miss");
      marker.classList.add("marker");
      cell.append(marker);
    }
  }
}

/**
 * Renders a modal that asks the player if they wish to play against the computer or another person.
 * Then takes in the username(s) of the player(s) and starts the game.
 */
export async function setupGame() {
  // Section for Player 1 to enter their username
  const player1NameInput = document.createElement("input");
  player1NameInput.id = "player1-name";
  player1NameInput.placeholder = "Type name here...";
  const player1NameLabel = document.createElement("label");
  player1NameLabel.htmlFor = "player1-name";
  player1NameLabel.textContent = "Player 1 Name";
  const player1Info = document.createElement("div");
  player1Info.id = "player1-info";
  player1Info.classList.add("visible");
  player1Info.append(player1NameLabel, player1NameInput);

  // Section for Player 2 to enter their username
  const player2NameInput = document.createElement("input");
  player2NameInput.id = "player2-name";
  player2NameInput.placeholder = "Type name here...";
  const player2NameLabel = document.createElement("label");
  player2NameLabel.htmlFor = "player2-name";
  player2NameLabel.textContent = "Player 2 Name";
  const player2Info = document.createElement("div");
  player2Info.id = "player2-info";
  player2Info.append(player2NameLabel, player2NameInput);

  // Container to hold the Player 1 and Player 2 information
  const playerInfoContainer = document.createElement("div");
  playerInfoContainer.id = "players-info";
  playerInfoContainer.classList.add("hide");
  playerInfoContainer.append(player1Info, player2Info);

  // Button to choose to play against the computer
  const computerGameButton = document.createElement("button");
  computerGameButton.textContent = "Singleplayer";
  computerGameButton.addEventListener("click", () => {
    computerGameButton.classList.add("selected");
    humanGameButton.classList.remove("selected");

    playerInfoContainer.classList.remove("hide");
    player2Info.classList.add("hide");

    playerInfoContainer.classList.add("visible");
    player2Info.classList.remove("visible");

    // Button to launch the game once setup complete
    const playButton = document.createElement("button");
    playButton.id = "play-button";
    playButton.textContent = "Play!";
    playButton.addEventListener("click", () => {
      const player1 = new Player(player1NameInput.value || "Player 1");
      const player2 = new ComputerPlayer();
      playGame(player1, player2);
    });
    if (!document.querySelector("#play-button")) {
      playerInfoContainer.append(playButton);
    }
  });

  // Button to choose to play against human
  const humanGameButton = document.createElement("button");
  humanGameButton.textContent = "Multiplayer";
  humanGameButton.addEventListener("click", () => {
    humanGameButton.classList.add("selected");
    computerGameButton.classList.remove("selected");

    playerInfoContainer.classList.remove("hide");
    player2Info.classList.remove("hide");

    playerInfoContainer.classList.add("visible");
    player2Info.classList.add("visible");

    // Button to launch the game once setup complete
    const playButton = document.createElement("button");
    playButton.id = "play-button";
    playButton.textContent = "Play!";
    playButton.addEventListener("click", () => {
      const player1 = new Player(player1NameInput.value || "Player 1");
      const player2 = new Player(player2NameInput.value || "Player 2");
      playGame(player1, player2);
    });

    if (!document.querySelector("#play-button")) {
      playerInfoContainer.append(playButton);
    }
  });

  const gameChoiceButtons = document.createElement("div");
  gameChoiceButtons.id = "game-choice-buttons";
  gameChoiceButtons.append(computerGameButton, humanGameButton);

  // Initialize the setup modal
  const modal = document.createElement("dialog");
  modal.id = "setup";
  modal.append(gameChoiceButtons, playerInfoContainer);

  const body = document.querySelector("body");
  body.append(modal);

  modal.showModal();
}

/**
 * Announces via a modal that a player just sunk a ship. Waits until they press "Continue" before resuming the game.
 */
export async function announceSunk() {
  const modalText = document.createElement("div");
  modalText.textContent = "Congratulations, you sunk a ship!";

  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.autofocus = true;
  continueButton.addEventListener("click", () => {
    modal.close();
  });

  const modal = document.createElement("dialog");
  modal.id = "sunkShip";
  modal.append(modalText, continueButton);

  const body = document.querySelector("body");
  body.append(modal);

  modal.showModal();

  await waitForEventOnSingularElement(continueButton, "click");
}

/**
 * Announces via a modal which player just won the game. Asks the players if they would like to play again or quit the game.
 * @param {Player} winner The player who won the game
 * @param {Player} opponent THe player who lost the game
 */
export function showGameOver(winner, opponent) {
  const modalText = document.createElement("div");
  modalText.textContent = `Game Over! ${winner.name} wins!`;

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.autofocus = true;
  playAgainButton.addEventListener("click", () => {
    modal.close();
    playGame(winner, loser);
  });

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    modal.close();
    setupGame();
  });

  const modal = document.createElement("dialog");
  modal.id = "gameOver";
  modal.append(modalText, playAgainButton, closeButton);

  const body = document.querySelector("body");
  body.append(modal);

  modal.showModal();
}

/**
 * Asks and waits for the player to pass the screen over to their opponent
 */
export async function flipScreen() {
  const modalText = document.createElement("div");
  modalText.textContent = "Please turn the screen to the other player";

  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.autofocus = true;
  continueButton.addEventListener("click", () => {
    modal.close();
  });

  const modal = document.createElement("dialog");
  modal.id = "flip";
  modal.append(modalText, continueButton);

  const body = document.querySelector("body");
  body.append(modal);

  modal.showModal();

  await waitForEventOnSingularElement(continueButton, "click");
}
