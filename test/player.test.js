import { Player } from "../src/player";
import { Gameboard } from "../src/gameboard";

const player = new Player("Elly");

it("has a name", () => {
  expect(player.name).toMatch("Elly");
});

it("has a gameboard", () => {
  expect(player.board).toBeInstanceOf(Gameboard);
});
