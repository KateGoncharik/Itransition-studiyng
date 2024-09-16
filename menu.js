export class Menu {
  static logMenu(moves) {
    const initialMoves = moves.map(
      (move, moveIndex) => `${moveIndex + 1} - ${move}\n`
    );
    const variants = [...initialMoves, '0 - exit\n', '? - help'];
    console.log(`Available moves: \n${variants.join('')}`);
  }
}
