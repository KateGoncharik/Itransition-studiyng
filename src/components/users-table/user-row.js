import { Component } from '../../../component.js';
import { applyErrorsToRecord } from '../../errors/errors.js';

export const createUserRow = (user) => {
  const errorsInput = document.querySelector('.errors-input');
  const errorsAmount = errorsInput.value;
  console.log('AA', errorsAmount);
  applyErrorsToRecord(user, errorsAmount);

  const row = new Component({ tag: 'tr' });
  const idCell = new Component({ tag: 'td', text: user.id });
  const randomIdCell = new Component({ tag: 'td', text: user.randomId });

  const telephoneCell = new Component({ tag: 'td', text: user.telephone });

  const locationCell = new Component({
    tag: 'td',
    text: user.address,
  });

  const nameCell = new Component({ tag: 'td', text: user.fullName });

  row.appendChildren([
    idCell,
    randomIdCell,
    nameCell,
    locationCell,
    telephoneCell,
  ]);

  return row;
};
