import { USER_RESULTS } from './constants.js';

export class Win {
  static declareWinner(result) {
    if (result === 0) {
      console.log(USER_RESULTS.draw);
    } else if (result < 0) {
      console.log(USER_RESULTS.userWon);
    } else {
      console.log(USER_RESULTS.userLost);
    }
  }
}
