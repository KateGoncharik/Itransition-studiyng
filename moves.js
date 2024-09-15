export class Moves {
  static getPCMove(moves) {
    return Math.floor(Math.random() * moves.length);
  }
}
