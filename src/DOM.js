export function renderPlayerBoard(player) {
  const boardContainer = document.getElementById("player-board");

  // reset board
  boardContainer.replaceChildren();

  // render the board
  for (let i = 0; i < player.board.size; i++) {
    const boardRow = document.createElement("div");
    boardRow.setAttribute("class", "row");
    boardContainer.appendChild(boardRow);

    for (let j = 0; j < player.board.size; j++) {
      const boardCell = document.createElement("div");
      boardCell.setAttribute("class", "cell");
      boardCell.dataset.y = player.board.size - i - 1;
      boardCell.dataset.x = j;
      boardRow.appendChild(boardCell);
    }
  }
}

export function renderEnemyBoard(player) {
  const boardContainer = document.getElementById("enemy-board");

  // reset board
  boardContainer.replaceChildren();

  // render the board
  for (let i = 0; i < player.board.size; i++) {
    const boardRow = document.createElement("div");
    boardRow.setAttribute("class", "row");
    boardContainer.appendChild(boardRow);

    for (let j = 0; j < player.board.size; j++) {
      const boardCell = document.createElement("button");
      boardCell.setAttribute("class", "cell");
      boardRow.appendChild(boardCell);
    }
  }
}
