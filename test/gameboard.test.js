import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

const gameboard = new Gameboard();

it("returns its size", () => {
  expect(gameboard.size).toBe(10);
});

it("returns the initialized ships", () => {
  expect(gameboard.ships).toStrictEqual([
    { ship: new Ship(5), name: "carrier", coordinates: [] },
    { ship: new Ship(4), name: "battleship", coordinates: [] },
    { ship: new Ship(3), name: "cruiser", coordinates: [] },
    { ship: new Ship(3), name: "submarine", coordinates: [] },
    { ship: new Ship(2), name: "destroyer", coordinates: [] },
  ]);
});

it("places a ship on the gameboard", () => {
  gameboard.placeShip("destroyer", [0, 0], "N");
  expect(gameboard.ships[4].coordinates).toStrictEqual([
    [0, 0],
    [0, 1],
  ]);
});

it("records a hit if an attack landed on a ship", () => {
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.hits).toStrictEqual([[0, 0]]);
  expect(gameboard.ships[4].ship.hits).toBe(1);
});

it("records a miss if an attack missed a ship", () => {
  gameboard.receiveAttack([1, 1]);
  expect(gameboard.misses).toStrictEqual([[1, 1]]);
});

it("returns false when there are still ships that aren't sunk", () => {
  expect(gameboard.checkShips()).toBe(false);
});

it("returns true when all the ships are sunk", () => {
  gameboard.receiveAttack([0, 1]);
  for (const obj of gameboard.ships.slice(0, -1)) {
    for (let i = 0; i < obj.ship.length; i++) {
      obj.ship.hit();
    }
  }
  expect(gameboard.checkShips()).toBe(true);
});
