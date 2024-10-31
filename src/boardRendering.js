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
    boardRow.classList.add("row");
    DOMContainer.append(boardRow);

    for (let j = 0; j < player.board.size + 1; j++) {
      const boardCell = document.createElement("div");
      boardCell.classList.add("clickable");

      // add click to attack only on opponent board
      if (isOpponent) {
        boardCell.addEventListener(
          "click",
          (e) => {
            attack(e, player);
          },
          { once: true }
        );
      }

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

        // add markers only to the current player board, otherwise messes up clicks on opponent board
        if (!isOpponent) {
          const marker = document.createElement("div");
          marker.classList.add("marker");
          boardCell.append(marker);
        }
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

  for (const coordinate of hits) {
    const marker = document.querySelector(
      `#${player.name}-board [data-col='${coordinate[0] + 1}'][data-row='${
        coordinate[1] + 1
      }'] .marker`
    );

    marker.classList.add("hit");
  }
}

function renderMisses(player) {
  const misses = player.board.misses;

  for (const coordinate of misses) {
    const marker = document.querySelector(
      `#${player.name}-board [data-col='${coordinate[0] + 1}'][data-row='${
        coordinate[1] + 1
      }'] .marker`
    );
    marker.classList.add("miss");
  }
}

function attack(event, player) {
  // add a marker the the clicked cell to show a miss or a hit
  const marker = document.createElement("div");
  marker.classList.add("marker");
  event.target.append(marker);

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
