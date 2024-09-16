import AsciiTable from 'ascii-table/ascii-table.js';

export class Table {
  static logTable(moves) {
    const table = new AsciiTable('');

    const headings = ['v PC\\User >', ...moves];
    table.setHeading(...headings);

    const sideMovesAmount = Math.floor(moves.length / 2);

    moves.forEach((PCMove, PCMoveIndex) => {
      const row = [PCMove];

      moves.forEach((_, userMoveIndex) => {
        const result = Math.sign(
          ((PCMoveIndex - userMoveIndex + sideMovesAmount + moves.length) %
            moves.length) -
            sideMovesAmount
        );

        if (result === 0) {
          row.push('Draw');
        } else if (result === 1) {
          row.push('Lose');
        } else {
          row.push('Win');
        }
      });

      table.addRow(...row);
    });

    console.log(table.toString());
  }
}
