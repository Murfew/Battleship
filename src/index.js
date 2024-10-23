import { Player, ComputerPlayer } from "./player";
import { initializePage, renderPlayerBoard } from "./DOM";
import "./styles.css";

const player1 = new Player("Player1");
const player2 = new ComputerPlayer();

const board1 = player1.board;
const board2 = player2.board;

// Initial Board Population
board1.placeShip("carrier", [2, 1], [1, 0]);
board1.placeShip("battleship", [8, 8], [0, -1]);
board1.placeShip("cruiser", [5, 3], [-1, 0]);
board1.placeShip("submarine", [2, 6], [0, 1]);
board1.placeShip("destroyer", [5, 7], [1, 0]);

for (const obj of board2.ships) {
  board2.placeShip(obj.name, [board2.ships.indexOf(obj), 0], [0, 1]);
}

initializePage(player1, player2);

renderPlayerBoard(player1, false);
renderPlayerBoard(player2, true);
