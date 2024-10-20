import { Ship } from "./ship";

export class Gameboard {
  #misses;
  #hits;
  #size;
  #ships;

  constructor() {
    this.#misses = [];
    this.#hits = [];
    this.#size = 8;
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

    switch (direction) {
      case "N":
        for (let i = 0; i < currentShip.ship.length - 1; i++) {
          currentShip.coordinates.push([start[0], start[1] + 1]);
        }
        break;

      case "E":
        for (let i = 0; i < currentShip.ship.length - 1; i++) {
          currentShip.coordinates.push([start[0] + 1, start[1]]);
        }
        break;

      case "S":
        for (let i = 0; i < currentShip.ship.length - 1; i++) {
          currentShip.coordinates.push([start[0], start[1] - 1]);
        }
        break;

      case "W":
        for (let i = 0; i < currentShip.ship.length - 1; i++) {
          currentShip.coordinates.push([start[0] - 1, start[1]]);
        }
        break;
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
}
