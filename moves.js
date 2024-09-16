import readlineSync from 'readline-sync';
import { EXIT_MENU_OPTION, HELP_MENU_OPTION } from './constants.js';
import { Table } from './table.js';

export class Moves {
  static getPCMove(moves) {
    return Math.floor(Math.random() * moves.length);
  }
  static validateInitialMoves(initialMoves) {
    const uniqueValues = new Set(initialMoves);

    if (
      initialMoves.length < 1 ||
      initialMoves.length % 2 === 0 ||
      uniqueValues.length !== initialMoves.length
    ) {
      console.log('Try again with odd amount of unique initial moves');
      process.exit(2);
    }
  }
  static getUserMove(initialMoves) {
    let userMove;

    while (true) {
      userMove = readlineSync.question('Enter your move: ');
      if (parseInt(userMove) === EXIT_MENU_OPTION) {
        process.exit(1);
      }
      if (userMove === HELP_MENU_OPTION) {
        Table.logTable(initialMoves);
      }
      const isValidMove = (move) =>
        (move && move >= EXIT_MENU_OPTION && move <= initialMoves.length) ||
        move === '?';
      if (isValidMove(parseInt(userMove))) {
        break;
      }
      console.log(
        `Your move should contain only numbers from 0 to ${initialMoves.length} or ?`
      );
    }
    return userMove;
  }
}
