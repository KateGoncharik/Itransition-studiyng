import { Component } from '../../component.js';
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

import { getSelectedUsers } from './get-selected-users.js';
import { auth, db } from '../../firebase-config.js';
import { deleteUser } from './menu-actions/delete-user.js';

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

export async function getUserByEmail(email) {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`No user with email ${email}`);
    }
    const userDoc = querySnapshot.docs[0];

    return {
      ...userDoc.data(),
      uid: userDoc.id,
    };
  } catch (error) {
    console.error('Error while getting user by email:', error);
  }
}
