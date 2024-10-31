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

export function initializePage(player, opponent) {
  const body = document.querySelector("body");
  body.replaceChildren();

  const turnPlayerDisplay = document.createElement("h1");
  turnPlayerDisplay.textContent = `${player.name}'s turn`;

  const boards = document.createElement("div");
  boards.id = "boards";

  const playerBoard = document.createElement("div");
  playerBoard.id = `${player.name}-board`;

  const enemyBoard = document.createElement("div");
  enemyBoard.id = `${opponent.name}-board`;

  boards.append(playerBoard, enemyBoard);

  body.append(turnPlayerDisplay, boards);
}

export function renderPlayerBoard(player, isOpponent) {
  const boardContainer = document.querySelector(`#${player.name}-board`);

  // reset board
  boardContainer.replaceChildren();

  // render the cells
  // first row and column for indices
  renderCells(player, boardContainer, isOpponent);

  // render a player's ships
  if (!isOpponent) {
    renderShips(player);
  }

  // render the misses
  renderMisses(player);

  // render the hits
  renderHits(player);
}

function renderCells(player, DOMContainer, isOpponent) {
  for (let i = 0; i < player.board.size + 1; i++) {
    const boardRow = document.createElement("div");
    boardRow.classList.add("row");
    DOMContainer.append(boardRow);

    for (let j = 0; j < player.board.size + 1; j++) {
      const boardCell = document.createElement("div");

      // differentiate between cells that mark the indices vs cells that will contain gameplay
      if (i === 0 && j !== 0) {
        boardCell.classList.add("index-cell");
        boardCell.textContent = alphabetIndexes[j - 1];
      } else if (i === 0 && j === 0) {
        boardCell.classList.add("index-cell");
      } else if (i !== 0 && j === 0) {
        boardCell.classList.add("index-cell");
        boardCell.textContent = i;
      } else {
        boardCell.classList.add("cell");
        boardCell.dataset.row = i;
        boardCell.dataset.col = j;
        boardCell.classList.add("clickable");
      }

      boardRow.append(boardCell);
    }
  }
}

function renderShips(player) {
  const ships = player.board.ships;

  for (const obj of ships) {
    const shipCoordinates = obj.coordinates;

    for (const pair of shipCoordinates) {
      const cell = document.querySelector(
        `#${player.name}-board [data-col='${pair[0] + 1}'][data-row='${
          pair[1] + 1
        }']`
      );

      cell.classList.add("ship");
    }
  }
}

export function renderHits(player) {
  const hits = player.board.hits;

  for (const coordinate of hits) {
    const cell = document.querySelector(
      `#${player.name}-board [data-col='${coordinate[0] + 1}'][data-row='${
        coordinate[1] + 1
      }']`
    );

    // make the cell's hover effect disappear
    cell.classList.remove("clickable");

    // add hit marker
    if (cell.childElementCount === 0) {
      const marker = document.createElement("div");
      marker.classList.add("hit");
      marker.classList.add("marker");
      cell.append(marker);
    }
  }
}

export function renderMisses(player) {
  const misses = player.board.misses;

  for (const coordinate of misses) {
    const cell = document.querySelector(
      `#${player.name}-board [data-col='${coordinate[0] + 1}'][data-row='${
        coordinate[1] + 1
      }']`
    );

    // make the cell's hover effect disappear
    cell.classList.remove("clickable");

    // add miss marker
    if (cell.childElementCount === 0) {
      const marker = document.createElement("div");
      marker.classList.add("miss");
      marker.classList.add("marker");
      cell.append(marker);
    }
  }
}
