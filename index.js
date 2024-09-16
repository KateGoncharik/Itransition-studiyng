import readlineSync from 'readline-sync';
import { Security } from './secret-key.js';
import { Moves } from './moves.js';
import { Win } from './win.js';
import { Menu } from './menu.js';
import { Table } from './table.js';

const initialMoves = process.argv.slice(2);
if (initialMoves.length < 1 || initialMoves.length % 2 === 0) {
  console.log('Try again with odd amount of initial moves');
  process.exit(2);
}

const secretKey = Security.getSecretKey();
const PCMoveIndex = Moves.getPCMove(initialMoves);
const hmac = Security.getHMAC(secretKey, initialMoves[PCMoveIndex]);
console.log(hmac);
Menu.logMenu(initialMoves);
let userMove;
while (true) {
  userMove = readlineSync.question('Enter your move: ');
  if (userMove === '0') {
    process.exit(1);
  }
  if (userMove === '?') {
    Table.logTable(initialMoves);
  }
  const isValidMove = (move) =>
    (move && move >= 0 && move <= initialMoves.length) || move === '?';
  if (isValidMove(parseInt(userMove))) {
    break;
  }
  console.log(
    `Your move should contain only numbers from 0 to ${initialMoves.length} or ?`
  );
}

const userMoveIndex = userMove - 1;
console.log('Your move is ' + initialMoves[userMoveIndex]);
const sideMovesAmount = Math.floor(initialMoves.length / 2);
const resultForPC = Math.sign(
  ((PCMoveIndex - userMoveIndex + sideMovesAmount + initialMoves.length) %
    initialMoves.length) -
    sideMovesAmount
);
Win.declareWinner(resultForPC);
console.log(`PC move is ${initialMoves[PCMoveIndex]}`);
console.log(`HMAC key: ${secretKey}`);
