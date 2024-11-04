import { Player, ComputerPlayer } from "./player";
import { initializePage, renderPlayerBoard } from "./boardRendering";
import "./styles.css";
import { playGame } from "./gameLogic";

// Player initialization
// TODO game choice (human or computer)
const player1 = new Player("Player1");
const player2 = new ComputerPlayer();

// TODO allow players to place ships (coordinate entries, random, drag and drop)
// TODO announce sinking of ship (dialog?)
// Initial Board Population (TEST)
const board1 = player1.board;
const board2 = player2.board;

board1.placeShip("carrier", [2, 1], [1, 0]);
board1.placeShip("battleship", [8, 8], [0, -1]);
board1.placeShip("cruiser", [5, 3], [-1, 0]);
board1.placeShip("submarine", [2, 6], [0, 1]);
board1.placeShip("destroyer", [5, 7], [1, 0]);

for (const obj of board2.ships) {
  board2.placeShip(obj.name, [board2.ships.indexOf(obj), 0], [0, 1]);
}

// Game loop
playGame(player1, player2);
