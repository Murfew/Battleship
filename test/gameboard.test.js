import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

const gameboard = new Gameboard();

it("returns its size", () => {
  expect(gameboard.size).toBe(8);
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
