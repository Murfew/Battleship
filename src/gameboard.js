import { Ship } from "./ship";

export class Gameboard {
  #misses;
  #hits;
  #size;
  #ships;

  constructor() {
    this.#misses = [];
    this.#hits = [];
    this.#size = 10;
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

  // TODO input validation
  placeShip(name, start, direction) {
    let currentShip;

    for (let i = 0; i < this.#ships.length; i++) {
      if (this.#ships[i].name == name) {
        currentShip = this.#ships[i];
        break;
      }
    }

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

  receiveAttack(coordinates) {
    // see if coordinates belong to a ship
    for (const ship of this.#ships) {
      for (const coordinate of ship.coordinates) {
        if (this.#compareArrays(coordinate, coordinates)) {
          this.#hits.push(coordinates);
          ship.ship.hit();
          return;
        }
      }
    }

    this.#misses.push(coordinates);
  }

  checkShips() {
    for (const obj of this.#ships) {
      if (!obj.ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
