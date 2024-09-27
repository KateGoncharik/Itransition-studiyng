export const config = {
  currentPageNumber: 0,
  getCurrentPageNumber() {
    return this.currentPageNumber;
  },
  incrementCurrentPageNumber() {
    this.currentPageNumber += 1;
  },
  resetCurrentPageNumber() {
    this.currentPageNumber = 0;
  },
};

const INITIAL_RECORDS_AMOUNT = 20;
const ADDITIONAL_RECORDS_AMOUNT = 10;

export { INITIAL_RECORDS_AMOUNT, ADDITIONAL_RECORDS_AMOUNT };
