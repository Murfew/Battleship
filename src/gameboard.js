import { Ship } from "./ship";
import { compareArrays, getRandomCoords, getRandomDirection } from "./utils";

/**
 * Class that represents a Battleship gameboard
 */
export class Gameboard {
  #misses;
  #hits;
  #size;
  #ships;

  /**
   * Create a new Gameboard Object
   */
  constructor() {
    this.#misses = [];
    this.#hits = [];
    this.#size = 9;
    this.#ships = [
      { ship: new Ship(5), name: "carrier", coordinates: [] },
      { ship: new Ship(4), name: "battleship", coordinates: [] },
      { ship: new Ship(3), name: "cruiser", coordinates: [] },
      { ship: new Ship(3), name: "submarine", coordinates: [] },
      { ship: new Ship(2), name: "destroyer", coordinates: [] },
    ];
  }

  /**
   * Returns the array of all the ships
   */
  get ships() {
    return this.#ships;
  }

  /**
   * Returns the size of the gameboard
   */
  get size() {
    return this.#size;
  }

  /**
   * Returns the coordinates of the opponent's attacks that missed
   */
  get misses() {
    return this.#misses;
  }

  /**
   * Returns the coordinates of the opponent's attacks that hit
   */
  get hits() {
    return this.#hits;
  }

  /**
   * Logs an opponent's attack as a miss
   * @param {Array} coordinates - Coordinates of an attack that missed
   */
  addMiss(coordinates) {
    this.#misses.push(coordinates);
  }

  /**
   * Logs an opponent's attack as a hit
   * @param {Array} coordinates - Coordinates of an attack that hit
   */
  addHit(coordinates) {
    this.#hits.push(coordinates);
  }

  /**
   *
   * @param {String} name - Name of the ship object to be found
   * @returns The ship object that is associated to the given name
   */
  getShip(name) {
    for (let i = 0; i < this.#ships.length; i++) {
      if (this.#ships[i].name == name) {
        return this.#ships[i];
      }
    }
  }

  /**
   * Places a ship on the board
   * @param {String} name The name of the ship to be placed
   * @param {Array} start The starting coordinate for the ship
   * @param {Array} direction The direction the ship should be placed in; [0, 1] for downwards and [1, 0] for to the right
   */
  placeShip(name, start, direction) {
    let currentShip = this.getShip(name);

    currentShip.coordinates.push(start);
    for (let i = 1; i < currentShip.ship.length; i++) {
      currentShip.coordinates.push([
        currentShip.coordinates[i - 1][0] + direction[0],
        currentShip.coordinates[i - 1][1] + direction[1],
      ]);
    }
  }

  /**
   * Checks to see if a given coordinate corresponds to a ship's coordinate
   * @param {Array} coordinates Coordinates to check for an overlap
   * @returns An array stating if there was an overlap, and if so with the ship with which it occurred
   */
  #checkOverlap(coordinates) {
    for (const ship of this.#ships) {
      for (const coordinate of ship.coordinates) {
        if (compareArrays(coordinate, coordinates)) {
          // Overlap, ship found there
          return [true, ship];
        }
      }
    }

    // No overlap, no ship
    return [false, null];
  }

  /**
   * Set an attack as a hit if it hits a ship, or a miss otherwise
   * @param {Array} coordinates Coordinates of the attack
   */
  receiveAttack(coordinates) {
    const [overlap, ship] = this.#checkOverlap(coordinates);

    if (overlap) {
      this.addHit(coordinates);
      ship.ship.hit();
    } else {
      this.addMiss(coordinates);
    }
  }

  /**
   *
   * @returns The number of sunk ships
   */
  checkShips() {
    let numberOfSunk = 0;
    for (const obj of this.#ships) {
      if (!obj.ship.isSunk()) {
        numberOfSunk++;
      }
    }
    return numberOfSunk;
  }

  /**
   * Checks if a ships placement is valid
   * @param {String} name The ship's name
   * @param {Array} start The ship's starting coordinates
   * @param {Array} direction The ships direction. [0, 1] for down and [1, 0] for right.
   * @returns True if the ship can be placed at the start coordinates in that direction
   */
  checkShipIsValid(name, start, direction) {
    const shipLength = this.getShip(name).ship.length;

    for (let i = 0; i < shipLength; i++) {
      // Check for each cell the ship occupies
      const testX = start[0] + direction[0] * i;
      const testY = start[1] + direction[1] * i;

      // Check out of bounds
      if (testX >= this.#size || testY >= this.#size) {
        return false;
      }

      // Check if another ship is already there
      if (this.#checkOverlap([testX, testY])[0]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Randomly generates a ship configuration for the player
   * @param {Player} player - The player to have their board's configuration be randomly generated
   */
  randomShipSetup() {
    for (const obj of this.ships) {
      let testStart;
      let testDirection;

      do {
        // Generate a potential placement (start, direction)
        // Keep generating until a valid placement is found
        testStart = getRandomCoords(this.size);
        testDirection = getRandomDirection();
      } while (!this.checkShipIsValid(obj.name, testStart, testDirection));

      this.placeShip(obj.name, testStart, testDirection);
    }
  }
}
