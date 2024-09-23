import { Component } from '../../component.js';
import {
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

import { getSelectedUsers } from './get-selected-users.js';
import { auth, db } from '../../firebase-config.js';
import { deleteUser } from './menu-actions/delete-user.js';
import { getUserByEmail } from './get-user-by-email.js';

export const createMenu = () => {
  const deleteButton = new Component({ tag: 'button', text: 'Удалить' });
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

  return new Component(
    { className: 'menu container-fluid' },
    deleteButton,
    blockButton
  );
};

export const blockUser = async (email, userId) => {
  const userDoc = doc(db, 'users', userId);
  await updateDoc(userDoc, {
    status: 'blocked',
  })
    .then(async () => {
      const user = auth.currentUser;
      if (user && user.email === email) {
        await signOut(auth);
      }
    })
    .catch((error) => {
      console.error('Error while blocking user: ', error);
    });
};
