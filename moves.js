export class Moves {
  static getPCMove(moves) {
    return Math.floor(Math.random() * (moves.length - 1 - 0 + 1) + 0);
  }
}
