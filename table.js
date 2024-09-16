import AsciiTable from 'ascii-table/ascii-table.js';
import { USER_RESULTS } from './constants.js';

export class Table {
  static logTable(moves) {
    const table = new AsciiTable();
    const twoPlayersHeading = 'v PC\\User >';
    const headings = [twoPlayersHeading, ...moves];
    table.setHeading(...headings);

    const halfMovesAmount = Math.floor(moves.length / 2);
    moves.forEach((PCMove, PCMoveIndex) => {
      const row = [PCMove];

      moves.forEach((_, userMoveIndex) => {
        const PCResult = Math.sign(
          ((PCMoveIndex - userMoveIndex + halfMovesAmount + moves.length) %
            moves.length) -
            halfMovesAmount
        );

        if (PCResult === 0) {
          row.push(USER_RESULTS.draw);
        } else if (PCResult === 1) {
          row.push(USER_RESULTS.userLost);
        } else {
          row.push(USER_RESULTS.userWon);
        }
      });

      table.addRow(...row);
    });

    console.log(table.toString());
  }
}
