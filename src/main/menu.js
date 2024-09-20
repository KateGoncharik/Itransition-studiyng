import { Component } from '../../component.js';
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getSelectedUsers } from './selected-users.js';
import { db } from '../../firebase-config.js';

export const createMenu = () => {
  const deleteButton = new Component({ tag: 'button', text: 'Удалить' });
  deleteButton.addListener('click', () => {
    getSelectedUsers().forEach(async (userEmail) => {
      getUserByEmail(userEmail).then((result) => deleteUser(result.uid));
    });
  });

  return new Component({ className: 'menu container-fluid' }, deleteButton);
};

export const deleteUser = (userId) => {
  const userDoc = doc(db, 'users', userId);
  deleteDoc(userDoc)
    .then(() => {
      console.log('User deleted successfully');
    })
    .catch((error) => {
      console.error('Error while deleting user: ', error);
    });
};

async function getUserByEmail(email) {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`No user with email ${email}`);
    }
    const userDoc = querySnapshot.docs[0];
    const userData = {
      ...userDoc.data(),
      uid: userDoc.id,
    };

    return userData;
  } catch (error) {
    console.error('Error while getting user by email:', error);
  }
}
