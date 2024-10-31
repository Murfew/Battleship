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

  const playerBoard = document.createElement("div");
  playerBoard.id = `${player.name}-board`;

  const enemyBoard = document.createElement("div");
  enemyBoard.id = `${opponent.name}-board`;

  body.append(playerBoard, enemyBoard);
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
    boardRow.setAttribute("class", "row");
    DOMContainer.append(boardRow);

    for (let j = 0; j < player.board.size + 1; j++) {
      const boardCell = document.createElement("div");

      // add markers
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

function renderHits(player) {
  const hits = player.board.hits;

  for (const pair of hits) {
    const marker = document.querySelector(
      `#${player.name}-board [data-col='${pair[0] + 1}'][data-row='${
        pair[1] + 1
      }'] .marker`
    );

    marker.classList.add("hit");
  }
}

function renderMisses(player) {
  const misses = player.board.misses;

  for (const pair of misses) {
    const marker = document.querySelector(
      `#${player.name}-board [data-col='${pair[0] + 1}'][data-row='${
        pair[1] + 1
      }'] .marker`
    );

    marker.classList.add("miss");
  }
}
