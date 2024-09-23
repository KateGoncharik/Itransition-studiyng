import { Component } from '../../../component.js';

import { getSelectedUsers } from './get-selected-users.js';
import { deleteUser } from './menu-actions/delete-user.js';
import { getUserByEmail } from './get-user-by-email.js';
import { blockUser } from './menu-actions/block-user.js';
import { unblockUser } from './menu-actions/unblock-user.js';

export const createMenu = () => {
  const deleteButton = new Component(
    { tag: 'button', text: 'Delete', className: 'btn btn-danger p-2 m-1' },
    new Component({ tag: 'span', className: 'bi bi-trash p-2' })
  );
  deleteButton.addListener('click', () => {
    getSelectedUsers().forEach(async (userEmail) => {
      getUserByEmail(userEmail).then((result) =>
        deleteUser(userEmail, result.uid)
      );
    });
  });

  const blockButton = new Component(
    { tag: 'button', text: 'Block', className: 'btn btn-primary p-2 m-1' },
    new Component({ tag: 'span', className: 'bi bi-lock p-2' })
  );
  blockButton.addListener('click', () => {
    getSelectedUsers().forEach(async (userEmail) => {
      getUserByEmail(userEmail).then((result) =>
        blockUser(userEmail, result.uid)
      );
    });
  });
  const unblockButton = new Component(
    { tag: 'button', text: 'Unblock', className: 'btn btn-primary p-2 m-1' },
    new Component({ tag: 'span', className: 'bi bi-unlock p-2' })
  );
  unblockButton.addListener('click', () => {
    getSelectedUsers().forEach(async (userEmail) => {
      getUserByEmail(userEmail).then((result) => unblockUser(result.uid));
    });
  });

  return new Component(
    { className: 'menu container-fluid' },
    blockButton,
    unblockButton,
    deleteButton
  );
};
