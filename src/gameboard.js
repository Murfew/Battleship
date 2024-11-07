import { Ship } from "./ship";

export class Gameboard {
  #misses;
  #hits;
  #size;
  #ships;

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

  get ships() {
    return this.#ships;
  }

  get size() {
    return this.#size;
  }

  get misses() {
    return this.#misses;
  }

  get hits() {
    return this.#hits;
  }

  addMiss(coordinates) {
    this.#misses.push(coordinates);
  }

  addHit(coordinates) {
    this.#hits.push(coordinates);
  }

  getShip(name) {
    for (let i = 0; i < this.#ships.length; i++) {
      if (this.#ships[i].name == name) {
        return this.#ships[i];
      }
    }
  }

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

  #compareArrays(a, b) {
    return a.toString() === b.toString();
  }

  #checkOverlap(coordinates) {
    for (const ship of this.#ships) {
      for (const coordinate of ship.coordinates) {
        if (this.#compareArrays(coordinate, coordinates)) {
          return [true, ship];
        }
      }
    }

    return [false, null];
  }

  receiveAttack(coordinates) {
    const [overlap, ship] = this.#checkOverlap(coordinates);

    if (overlap) {
      this.addHit(coordinates);
      ship.ship.hit();
      return;
    }

    this.addMiss(coordinates);
  }

  checkShips() {
    for (const obj of this.#ships) {
      if (!obj.ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  checkShipIsValid(name, start, direction) {
    const shipLength = this.getShip(name).ship.length;

    for (let i = 0; i < shipLength; i++) {
      const testX = start[0] + direction[0] * i;
      const testY = start[1] + direction[1] * i;

      console.log(testX, testX >= this.#size, testY, testY >= this.#size);
      if (testX >= this.#size || testY >= this.#size) {
        return false;
      }

      if (this.#checkOverlap([testX, testY])[0]) {
        return false;
      }
    }

    return true;
  }
}
