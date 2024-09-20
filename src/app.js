import { Component } from '../component.js';
import { auth, db } from '../firebase-config.js';
import { renderAuthPage, renderUserTable } from './main/users-table.js';
import { nav } from './nav.js';
import {
  collection,
  onSnapshot,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import {
  doc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

export const app = new Component(
  {},
  new Component(
    { className: 'wrapper container-fluid' },
    nav,
    new Component({
      className: 'page-content container-fluid',
    })
  )
);

let unsubscribeFromUsers = null;

auth.onAuthStateChanged((user) => {
  if (user) {
    const usersCollection = collection(db, 'users');

    unsubscribeFromUsers = onSnapshot(usersCollection, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc);
      });

      renderUserTable(users);
    });

    getDocs(usersCollection).then((snapshot) => {
      renderUserTable(snapshot.docs);
    });
  } else {
    console.log('User is not authenticated');

    if (unsubscribeFromUsers) {
      unsubscribeFromUsers();
      unsubscribeFromUsers = null;
    }
    renderAuthPage();
  }
});

export const deleteUser = (userId) => {
  const userDoc = doc(db, 'users', userId);
  deleteDoc(userDoc)
    .then(() => {
      console.log('User deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting user: ', error);
    });
};
