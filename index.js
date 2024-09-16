import { Security } from './security.js';
import { Moves } from './moves.js';
import { Win } from './win.js';
import { Menu } from './menu.js';

const initialMoves = process.argv.slice(2);
Moves.validateInitialMoves(initialMoves);

const secretKey = Security.getSecretKey();
const PCMoveIndex = Moves.getPCMove(initialMoves);
const hmac = Security.getHMAC(secretKey, initialMoves[PCMoveIndex]);
console.log(hmac);
Menu.logMenu(initialMoves);
const userMove = Moves.getUserMove(initialMoves);
const userMoveIndex = userMove - 1;
console.log(`Your move is ${initialMoves[userMoveIndex]}`);
const sideMovesAmount = Math.floor(initialMoves.length / 2);
const resultForPC = Math.sign(
  ((PCMoveIndex - userMoveIndex + sideMovesAmount + initialMoves.length) %
    initialMoves.length) -
    sideMovesAmount
);
Win.declareWinner(resultForPC);
console.log(`PC move is ${initialMoves[PCMoveIndex]}`);
console.log(`HMAC key: ${secretKey}`);
