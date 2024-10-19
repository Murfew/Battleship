// TODO input validation

export class Ship {
  #length;
  #hits;
  #sunk;

  constructor(length) {
    this.#length = length;
    this.#hits = 0;
    this.#sunk = false;
  }

  get length() {
    return this.#length;
  }

  get hits() {
    return this.#hits;
  }

  get sunk() {
    return this.#sunk;
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#hits === this.#length;
  }
}
