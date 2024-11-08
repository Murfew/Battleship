import { Gameboard } from "./gameboard";
import { compareArrays, getRandomCoords } from "./utils";

/**
 * Class that represents a player
 */
export class Player {
  #name;
  #board;

  /**
   * Creates a new player
   * @param {String} name The player's name
   */
  constructor(name) {
    this.#name = name;
    this.#board = new Gameboard();
  }

  /**
   * Returns the player's name
   */
  get name() {
    return this.#name;
  }

  /**
   * Returns the player's board
   */
  get board() {
    return this.#board;
  }
}

/**
 * Class that represents a computer player
 */
export class ComputerPlayer extends Player {
  #previousMoves;
  #movesAdjacentToHits;

  /**
   * Creates a new computer player
   */
  constructor() {
    super("Computer");
    this.#previousMoves = [];
    this.#movesAdjacentToHits = [];
  }

  /**
   * Chooses a move adjacent to previous hits, or randomly if none exist.
   * @returns The move chosen by the computer
   */
  makeMove() {
    let move;

    // Check if there are any cells adjacent to previous hits
    // If so, use one of those as our move
    if (this.#movesAdjacentToHits.length != 0) {
      move = this.#movesAdjacentToHits.at(-1);
      this.#movesAdjacentToHits.pop();
      this.#previousMoves.push(move);
      return move;

      // If not, make a random move
    } else {
      // Generate a random move until we generate a move that hasn't been made already
      do {
        move = getRandomCoords(this.board.size);
      } while (this.checkIfMoveAlreadyMade(move));

      this.#previousMoves.push(move);
      return move;
    }
  }

  /**
   * Checks if a move has already been made or not
   * @param {Array} move Coordinates of the move to be checked
   * @returns A Boolean depending on if the given move has been made or not yet
   */
  checkIfMoveAlreadyMade(move) {
    for (const previous of this.#previousMoves) {
      if (compareArrays(previous, move)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Adds the cells adjacent to a given cell to our list of priority moves to make
   * @param {Array} coordinates Coordinates of cells who's adjacent cells we want to add
   */
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

    // Only add if the moves are valid
    // 1. In bounds
    // 2. Not already made
    for (const move of possibleAdjacentMoves) {
      if (
        move[0] < this.board.size &&
        move[0] >= 0 &&
        move[1] < this.board.size &&
        move[1] >= 0 &&
        !this.checkIfMoveAlreadyMade(move)
      ) {
        this.#movesAdjacentToHits.push(move);
      }
    }
  }
}
