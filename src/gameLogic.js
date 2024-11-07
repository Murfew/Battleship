import {
  initializePage,
  renderHits,
  renderMisses,
  renderPlayerBoard,
} from "./boardRendering";
import { ComputerPlayer } from "./player";

// TODO computer logic (choose adjacent square to hit until sink)

export async function playGame(player1, player2) {
  let turnCounter = 0;
  const players = [player1, player2];

  randomGameSetup(player1);
  randomGameSetup(player2);

  while (true) {
    const turnPlayer = players[turnCounter % 2];
    const opponent = players[(turnCounter + 1) % 2];

    initializePage(turnPlayer, opponent);

    renderPlayerBoard(turnPlayer, false);
    renderPlayerBoard(opponent, true);

    // wait for a legal click
    const clickableCells = document.querySelectorAll(".cell.clickable");
    const cellClickEvent = await waitForEventOnMultipleElements(
      clickableCells,
      "click"
    );

    // process the attack
    attack(cellClickEvent, opponent);

    // check for a loss
    if (opponent.board.checkShips()) {
      showGameOver(turnPlayer);
      break;
    }

    if (player2 instanceof ComputerPlayer) {
      // Human vs. Computer
      const numberHitsBeforeMove = player1.board.hits.length;
      const computerMove = player2.makeMove();
      player1.board.receiveAttack(computerMove);
      const numberHitsAfterMove = player1.board.hits.length;

      // If the move was a hit, add the adjacent cells to be tried next
      if (numberHitsAfterMove !== numberHitsBeforeMove) {
        player2.addAdjacentMoves(computerMove);
      }
    } else {
      // Human vs. Human

      // Ask player to turn screen to opponent
      await flipScreen();

      // Flip the turn
      turnCounter++;
    }
  }
}

function showGameOver(winner) {
  const body = document.querySelector("body");

  const modal = document.createElement("dialog");
  modal.id = "gameOver";
  body.append(modal);

  const modalText = document.createElement("div");
  modalText.textContent = `Game Over! ${winner.name} wins!`;

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.autofocus = true;
  playAgainButton.addEventListener("click", () => {
    modal.close();
    // TODO go to start/play again screen
  });

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    close();
  });

  modal.append(modalText, playAgainButton, closeButton);
  modal.showModal();
}

async function flipScreen() {
  // Create a modal that asks the user to confirm once the screen has been flipped
  const body = document.querySelector("body");

  const modal = document.createElement("dialog");
  modal.id = "flip";
  body.append(modal);

  const modalText = document.createElement("div");
  modalText.textContent = "Please turn the screen to the other player";

  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.autofocus = true;
  continueButton.addEventListener("click", () => {
    modal.close();
  });

  modal.append(modalText, continueButton);
  modal.showModal();

  await waitForEventOnSingularElement(continueButton, "click");
}

function attack(event, player) {
  // Get the coordinates of where the click happened
  const x = event.target.dataset.col;
  const y = event.target.dataset.row;

  // send the attack through
  player.board.receiveAttack([x - 1, y - 1]);

  // render opponent board after attack
  renderHits(player);
  renderMisses(player);
}

function waitForEventOnMultipleElements(elements, eventType) {
  return new Promise((resolve) => {
    elements.forEach((element) => {
      element.addEventListener(eventType, (event) => resolve(event), {
        once: true,
      });
    });
  });
}

function waitForEventOnSingularElement(element, eventType) {
  return new Promise((resolve) => {
    element.addEventListener(eventType, (event) => resolve(event), {
      once: true,
    });
  });
}

export function getRandomCoords() {
  const xValue = Math.floor(Math.random() * 9);
  const yValue = Math.floor(Math.random() * 9);

  return [xValue, yValue];
}

function getRandomDirection() {
  const choice = Math.floor(Math.random() * 2);
  if (choice === 1) {
    // Downwards
    return [0, 1];
  } else {
    // Right
    return [1, 0];
  }
}

function randomGameSetup(player) {
  for (const obj of player.board.ships) {
    // Generate random move
    let testStart;
    let testDirection;

    do {
      testStart = getRandomCoords();
      testDirection = getRandomDirection();
    } while (
      !player.board.checkShipIsValid(obj.name, testStart, testDirection)
    );

    player.board.placeShip(obj.name, testStart, testDirection);
  }
}
