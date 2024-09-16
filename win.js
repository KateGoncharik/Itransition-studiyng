export class Win {
  static declareWinner(result) {
    if (result === 0) {
      console.log('Draw');
    } else if (result < 0) {
      console.log('You win!');
    } else {
      console.log('You loose!');
    }
  }
}
