import {
  initializePage,
  renderHits,
  renderMisses,
  renderPlayerBoard,
} from "./boardRendering";

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

    // Flip the turn
    turnCounter++;
  }
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
