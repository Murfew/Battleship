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

export function renderPlayerBoard(player, isOpponent) {
  const boardContainer = isOpponent
    ? document.querySelector("#enemy-board")
    : document.querySelector("#player-board");

  // reset board
  boardContainer.replaceChildren();

  // render the cells
  // first row and column for indices
  renderCells(player, boardContainer);

  // TODO render a player's ships
  if (!isOpponent) {
    renderShips(player);
  }

  // TODO render the misses
  // TODO render the hits
}

function renderCells(player, DOMContainer) {
  for (let i = 0; i < player.board.size + 1; i++) {
    const boardRow = document.createElement("div");
    boardRow.setAttribute("class", "row");
    DOMContainer.append(boardRow);

    for (let j = 0; j < player.board.size + 1; j++) {
      const boardCell = document.createElement("div");

      if (i === 0 && j !== 0) {
        boardCell.setAttribute("class", "index-cell");
        boardCell.textContent = alphabetIndexes[j - 1];
      } else if (i === 0 && j === 0) {
        boardCell.setAttribute("class", "index-cell");
      } else if (i !== 0 && j === 0) {
        boardCell.setAttribute("class", "index-cell");
        boardCell.textContent = i;
      } else {
        boardCell.setAttribute("class", "cell");
        boardCell.dataset.row = i;
        boardCell.dataset.col = j;
        const marker = document.createElement("div");
        marker.setAttribute("class", "marker");
        boardCell.append(marker);
      }

      boardRow.append(boardCell);
    }
  }
}

function renderShips(player) {
  const board = player.board;

  for (const obj of board.ships) {
    const shipCoordinates = obj.coordinates;

    for (const pair of shipCoordinates) {
      const cell = document.querySelector(
        `#player-board [data-col='${pair[0] + 1}'][data-row='${pair[1] + 1}']`
      );

      cell.classList.add("ship");
    }
  }
}
