import { Gameboard } from "./gameboard";
import { getRandomCoords } from "./gameLogic";

export class Player {
  #name;
  #board;

  constructor(name) {
    this.#name = name;
    this.#board = new Gameboard();
  }

  get name() {
    return this.#name;
  }

  get board() {
    return this.#board;
  }
}

export class ComputerPlayer extends Player {
  #previousMoves;
  #movesAdjacentToHits;

  constructor() {
    super("Computer");
    this.#previousMoves = [];
    this.#movesAdjacentToHits = [];
  }

  makeMove() {
    // Don't make a move previously made
    // If we have made any hits, try the cells around it
    // Otherwise, make random move (DONT FORGET RULE 1)
    let move;

    if (this.#movesAdjacentToHits.length != 0) {
      move = this.#movesAdjacentToHits.at(-1);
      this.#movesAdjacentToHits.pop();
      this.#previousMoves.push(move);
      return move;
    } else {
      do {
        move = getRandomCoords();
      } while (this.checkIfMoveAlreadyMade(move));

      this.#previousMoves.push(move);
      return move;
    }
  }

  checkIfMoveAlreadyMade(move) {
    for (const previous of this.#previousMoves) {
      if (this.board.compareArrays(previous, move)) {
        return true;
      }
    }

    return false;
  }

  addAdjacentMoves(coordinates) {
    // x + 1
    const right = [coordinates[0] + 1, coordinates[1]];
    // x - 1
    const left = [coordinates[0] - 1, coordinates[1]];
    // y + 1
    const down = [coordinates[0], coordinates[1] + 1];
    // y - 1
    const up = [coordinates[0], coordinates[1] - 1];

    const possibleAdjacentMoves = [right, left, up, down];
    for (const move of possibleAdjacentMoves) {
      if (
        move[0] < this.board.size &&
        move[0] >= 0 &&
        move[1] < this.board.size &&
        move[1] >= 0 &&
        !this.checkIfMoveAlreadyMade(move)
      ) {
        console.log(move);
        this.#movesAdjacentToHits.push(move);
      }
    }
  }
}
