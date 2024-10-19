import { Ship } from "../src/ship";

const ship = new Ship(4);

it("returns its length", () => {
  expect(ship.length).toBe(4);
});

it("returns the number of times it has been hit", () => {
  expect(ship.hits).toBe(0);
});

it("returns if it has been sunk or not", () => {
  expect(ship.sunk).toBe(false);
});

it("increases the number of hits", () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

it("determines whether or not a ship is sunk based on its length and number of hits", () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
