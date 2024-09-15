import readlineSync from 'readline-sync';
import { SecretKey } from './secret-key.js';
import { Moves } from './moves.js';
import { Win } from './win.js';

const moves = process.argv.slice(2);
console.log('Start');

const key = SecretKey.getSecretKey();
const PCMoveIndex = Moves.getPCMove(moves);
const PCMoveNumber = PCMoveIndex + 1;
const hmac = SecretKey.getHMAC(key, moves[PCMoveIndex]);
console.log(hmac);
const userMove = readlineSync.question('Your move:');
if (
  !parseInt(userMove) ||
  parseInt(userMove) < 0 ||
  parseInt(userMove) > moves.length
) {
  console.log(`Wrong input. Should be only numbers from 1 to ${moves.length}`);
  process.exit(1);
  // TODO block game until correct input
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
