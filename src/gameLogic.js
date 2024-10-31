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
    let turnPlayer = players[turnCounter % 2];
    let opponent = players[(turnCounter + 1) % 2];

    initializePage(turnPlayer, opponent);

    renderPlayerBoard(turnPlayer, false);
    renderPlayerBoard(opponent, true);

    // wait for a legal click
    const clickableCells = document.querySelectorAll(".cell.clickable");
    const cellClickEvent = await waitForEvent(clickableCells, "click");

    // process the attack
    attack(cellClickEvent, opponent);

    // check for a loss

    // Flip the turn
    turnCounter++;
  }
}

function checkLoss() {}

function attack(event, player) {
  // add a marker the the clicked cell to show a miss or a hit

  // make the cell's hover effect disappear
  event.target.classList.remove("clickable");

  // Get the coordinates of where the click happened
  const x = event.target.dataset.col;
  const y = event.target.dataset.row;

  // send the attack through
  player.board.receiveAttack([x - 1, y - 1]);

  // re-render the board that received the attack
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
