import readlineSync from 'readline-sync';
import { SecretKey } from './secret-key.js';
import { Moves } from './moves.js';
import { Win } from './win.js';
import { Menu } from './menu.js';
import { Table } from './table.js';

const moves = process.argv.slice(2);
console.log('Start');
// TODO validate init moves
const key = SecretKey.getSecretKey();
const PCMoveIndex = Moves.getPCMove(moves);
const hmac = SecretKey.getHMAC(key, moves[PCMoveIndex]);
console.log(hmac);
Menu.logMenu(moves);
let userMove;
while (true) {
  userMove = readlineSync.question('Enter your move: ');
  if (userMove === '0') {
    process.exit(1);
  }
  if (userMove === '?') {
    Table.logTable(moves);
  }
  if (
    parseInt(userMove) &&
    parseInt(userMove) >= 0 &&
    parseInt(userMove) <= moves.length
  ) {
    break;
  }

  console.log(
    `Wrong input. Should be only numbers from 0 to ${moves.length} or ?`
  );
}

const userMoveIndex = userMove - 1;
console.log('Your move is ' + moves[userMoveIndex]);
const sideMovesAmount = Math.floor(moves.length / 2);
const resultForPC = Math.sign(
  ((PCMoveIndex - userMoveIndex + sideMovesAmount + moves.length) %
    moves.length) -
    sideMovesAmount
);
Win.declareWinner(resultForPC);
console.log('PC move is ' + moves[PCMoveIndex]);
console.log('HMAC key: ' + key);
console.log('Finish');
