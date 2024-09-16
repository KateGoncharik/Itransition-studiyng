import AsciiTable from 'ascii-table/ascii-table.js';

export class Table {
  static logTable(moves) {
    const table = new AsciiTable('');
    const twoPlayersHeading = 'v PC\\User >';
    const headings = [twoPlayersHeading, ...moves];
    table.setHeading(...headings);

    const halfMovesAmount = Math.floor(moves.length / 2);
    const possibleResults = {
      draw: 'draw',
      win: 'win',
      lose: 'lose',
    };
    moves.forEach((PCMove, PCMoveIndex) => {
      const row = [PCMove];

      moves.forEach((_, userMoveIndex) => {
        const result = Math.sign(
          ((PCMoveIndex - userMoveIndex + halfMovesAmount + moves.length) %
            moves.length) -
            halfMovesAmount
        );

        if (result === 0) {
          row.push(possibleResults.draw);
        } else if (result === 1) {
          row.push(possibleResults.lose);
        } else {
          row.push(possibleResults.win);
        }
      });

      table.addRow(...row);
    });

    console.log(table.toString());
  }
}
