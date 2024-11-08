/**
 * Class representing a Battleship ship
 */
export class Ship {
  #length;
  #hits;
  #sunk;

  /**
   * Creates a ship
   * @param {Number} length The ship's length
   */
  constructor(length) {
    this.#length = length;
    this.#hits = 0;
  }

  /**
   * Returns the length of the ship
   */
  get length() {
    return this.#length;
  }

  /**
   * Returns the number of hits on the ship
   */
  get hits() {
    return this.#hits;
  }

  /**
   * Adds a hit to the ship
   */
  hit() {
    this.#hits++;
  }

  /**
   *
   * @returns A Boolean indicating if the ship has been sunk or not
   */
  isSunk() {
    return this.#hits === this.#length;
  }
}
