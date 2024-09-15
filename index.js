import readlineSync from 'readline-sync';
import { SecretKey } from './secret-key.js';
import { Moves } from './moves.js';
import { Win } from './win.js';

const moves = process.argv.slice(2);
console.log('Start');

const key = SecretKey.getSecretKey();
const PCMoveIndex = Moves.getPCMove(moves);
const hmac = SecretKey.getHMAC(key, moves[PCMoveIndex]);
console.log(hmac);
const userMove = readlineSync.question('Your move:');
if (!parseInt(userMove)) {
  console.log(`Wrong input. Should be only numbers from 1 to ${moves.length}`);
  // TODO block game until correct input
}
console.log('Your move is ' + userMove);
const sideMovesAmount = Math.floor(moves.length / 2);
const isPCWin = Math.sign(
  ((PCMoveIndex - userMove + sideMovesAmount + moves.length) % moves.length) -
    sideMovesAmount
);
Win.declareWinner(isPCWin);
console.log('PC move is ' + moves[PCMoveIndex]);
console.log('Finish');
