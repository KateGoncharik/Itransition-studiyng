export class Win {
  static declareWinner(result) {
    const userResults = {
      draw: 'Draw!',
      win: 'You won!',
      lose: 'You lost!',
    };
    if (result === 0) {
      console.log(userResults.draw);
    } else if (result < 0) {
      console.log(userResults.win);
    } else {
      console.log(userResults.lose);
    }
  }
}
