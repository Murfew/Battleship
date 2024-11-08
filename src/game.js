import {
  announceSunk,
  flipScreen,
  initializePage,
  renderPlayerBoard,
  showGameOver,
} from "./page";
import { ComputerPlayer, Player } from "./player";
import { waitForEventOnMultipleElements } from "./utils";

/**
 * Handles the logic of the game loop of Computer vs. Human and Human vs. Human
 */
export async function playGame(player1, player2) {
  // Get turn counter, which helps track who's turn it is in a human vs human game
  // Get the player Objects
  let turnCounter = 0;
  const players = [player1, player2];

  // Game loop until loss
  while (true) {
    // Determine who the current player and the opponent is
    const turnPlayer = players[turnCounter % 2];
    const opponent = players[(turnCounter + 1) % 2];

    // Reset and load the basic HTML of the page
    initializePage(turnPlayer, opponent);

    // Display both player's boards
    renderPlayerBoard(turnPlayer, false);
    renderPlayerBoard(opponent, true);

    // Wait for a legal click
    const clickableCells = document.querySelectorAll(".cell.clickable");
    const cellClickEvent = await waitForEventOnMultipleElements(
      clickableCells,
      "click"
    );

    const numberOfSunkShipsBefore = opponent.board.checkShips();

    // Process the player's attack
    attack(cellClickEvent, opponent);

    const numberOfSunkShipsAfter = opponent.board.checkShips();

    // Announce if a ship was sunk
    if (numberOfSunkShipsAfter !== numberOfSunkShipsBefore) {
      await announceSunk();
    }

    // Stop game and announce winner if the player won
    if (opponent.board.checkShips() === 5) {
      showGameOver(turnPlayer);
      break;
    }

    // Human vs. Computer
    if (opponent instanceof ComputerPlayer) {
      const numberHitsBeforeMove = turnPlayer.board.hits.length;

      // Process the computer's attack
      const computerMove = opponent.makeMove();
      turnPlayer.board.receiveAttack(computerMove);

      const numberHitsAfterMove = turnPlayer.board.hits.length;

      // If the move was a hit, add the adjacent cells to be tried next
      if (numberHitsAfterMove !== numberHitsBeforeMove) {
        opponent.addAdjacentMoves(computerMove);
      }

      // Human vs. Human
    } else {
      // Ask player to turn screen to opponent
      await flipScreen();

      // Pass the turn to the other player
      turnCounter++;
    }
  }
}

/**
 * Registers and renders an attack on the opponent
 * @param {Event} event - The click event on the opponent's board
 * @param {Player} player - The player who is getting attacked (non-turn player)
 */
function attack(event, player) {
  // Get the coordinates of where the click happened
  const x = event.target.dataset.col;
  const y = event.target.dataset.row;

  // send the attack through to their board
  player.board.receiveAttack([x - 1, y - 1]);

  // render opponent board after attack
  renderPlayerBoard(player, true);
}
