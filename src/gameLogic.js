import {
  initializePage,
  renderHits,
  renderMisses,
  renderPlayerBoard,
} from "./boardRendering";

// TODO computer game loop vs human game loop
// TODO computer logic (random, choose adjacent square to hit until sink)
// TODO Game over screen

export async function playGame(player1, player2) {
  let turnCounter = 0;
  const players = [player1, player2];

  while (true) {
    const turnPlayer = players[turnCounter % 2];
    const opponent = players[(turnCounter + 1) % 2];

    initializePage(turnPlayer, opponent);

    renderPlayerBoard(turnPlayer, false);
    renderPlayerBoard(opponent, true);

    // wait for a legal click
    const clickableCells = document.querySelectorAll(".cell.clickable");
    const cellClickEvent = await waitForEvent(clickableCells, "click");

    // process the attack
    attack(cellClickEvent, opponent);

    // check for a loss
    if (opponent.board.checkShips()) {
      alert(`Game over! ${turnPlayer.name} wins!`);
      break;
    }

    // Ask player to turn screen to opponent
    flipScreen();
    await new Promise((r) => setTimeout(r, 10000));

    // Flip the turn
    turnCounter++;
  }
}

function flipScreen() {
  // TODO Create a modal that asks the user to confirm once the screen has been flipped
  const body = document.querySelector("body");

  const modal = document.createElement("dialog");
  body.append(modal);

  const modalText = document.createElement("div");
  modalText.textContent = "Please turn the screen to the other player";

  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.addEventListener("click", (modal) => {
    modal.close();
  });

  modal.append(modalText, continueButton);
  modal.show();
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

function waitForEvent(elements, eventType) {
  return new Promise((resolve) => {
    elements.forEach((element) => {
      element.addEventListener(eventType, (event) => resolve(event), {
        once: true,
      });
    });
  });
}
