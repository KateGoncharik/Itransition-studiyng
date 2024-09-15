import readlineSync from 'readline-sync';
import { SecretKey } from './secret-key.js';
import { Moves } from './moves.js';
import { Win } from './win.js';

const moves = process.argv;
const key = SecretKey.getSecretKey();
const PCMoveIndex = Moves.getPCMove(moves);
console.log('Start');
console.log(`${PCMoveIndex} and ${key}`);
const UserMove = readlineSync.question('Your move:');
console.log('Your move is ' + UserMove);
const sideMovesAmount = Math.floor(moves.length / 2);
const isPCWin = Math.sign(
  ((PCMoveIndex - UserMove + sideMovesAmount + moves.length) % moves.length) -
    sideMovesAmount
);
Win.declareWinner(isPCWin);
console.log('Finish');
