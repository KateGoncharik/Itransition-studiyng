import { Component } from '../../../component.js';

import { getSelectedUsers } from './get-selected-users.js';
import { deleteUser } from './menu-actions/delete-user.js';
import { getUserByEmail } from './get-user-by-email.js';
import { blockUser } from './menu-actions/block-user.js';
import { unblockUser } from './menu-actions/unblock-user.js';

export const createMenu = () => {
  const deleteButton = new Component({ tag: 'button', text: 'Delete' });
  deleteButton.addListener('click', () => {
    getSelectedUsers().forEach(async (userEmail) => {
      getUserByEmail(userEmail).then((result) =>
        deleteUser(userEmail, result.uid)
      );
    });
  });

  const blockButton = new Component({ tag: 'button', text: 'Block' });
  blockButton.addListener('click', () => {
    getSelectedUsers().forEach(async (userEmail) => {
      getUserByEmail(userEmail).then((result) =>
        blockUser(userEmail, result.uid)
      );
    });
  });
  const unblockButton = new Component({ tag: 'button', text: 'Unblock' });
  unblockButton.addListener('click', () => {
    getSelectedUsers().forEach(async (userEmail) => {
      getUserByEmail(userEmail).then((result) => unblockUser(result.uid));
    });
  });

  return new Component(
    { className: 'menu container-fluid' },
    deleteButton,
    blockButton,
    unblockButton
  );
};
