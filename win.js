export class Win {
  static declareWinner(isPCWin) {
    if (isPCWin === 0) {
      console.log('Draw');
    } else if (isPCWin > 0) {
      console.log('You loose!');
    } else {
      console.log('You won!');
    }
  }
}
