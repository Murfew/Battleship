import { Player, ComputerPlayer } from "./player";
import { renderPlayerBoard } from "./DOM";
import "./styles.css";

const player1 = new Player("Player 1");
const player2 = new ComputerPlayer();

const board1 = player1.board;
const board2 = player2.board;

// Initial Board Population
for (const obj of board1.ships) {
  board1.placeShip(obj.name, [board1.ships.indexOf(obj), 0], [0, 1]);
}

for (const obj of board2.ships) {
  board2.placeShip(obj.name, [board2.ships.indexOf(obj), 0], [0, 1]);
}

renderPlayerBoard(player1, false);
renderPlayerBoard(player2, true);
