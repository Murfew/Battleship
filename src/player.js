import { Gameboard } from "./gameboard";

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
  #name;

  constructor() {
    super();
    this.#name = "Computer";
  }
}
