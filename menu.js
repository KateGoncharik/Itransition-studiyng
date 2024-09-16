import { EXIT_MENU_OPTION, HELP_MENU_OPTION } from './constants.js';

export class Menu {
  static logMenu(moves) {
    const initialMoves = moves.map(
      (move, moveIndex) => `${moveIndex + 1} - ${move}\n`
    );
    const availableMoves = [
      ...initialMoves,
      `${EXIT_MENU_OPTION} - exit\n`,
      `${HELP_MENU_OPTION} - help`,
    ];
    console.log(`Available moves:\n${availableMoves.join('')}`);
  }
}
