// TODO input validation

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

  placeShip(name, start, direction) {
    let currentShip;

    for (let i = 0; i < this.#ships.length; i++) {
      if (this.#ships[i].name == name) {
        currentShip = this.#ships[i];
        break;
      }
    }

    switch (direction) {
      case "N":
        currentShip.coordinates.push(start);

        for (let i = 0; i < currentShip.ship.length - 1; i++) {
          currentShip.coordinates.push([start[0], start[1] + 1]);
        }

      case "E":

      case "S":

      case "W":
    }
  }
}
