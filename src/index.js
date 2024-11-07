import { Player, ComputerPlayer } from "./player";
import { initializePage, renderPlayerBoard } from "./boardRendering";
import "./styles.css";
import { playGame } from "./gameLogic";

// Player initialization
// TODO game choice (human or computer) (start screen)
const player1 = new Player("Player1");
const player2 = new ComputerPlayer();

// TODO allow players to place ships (coordinate entries, random, drag and drop)

// Game loop
playGame(player1, player2);
