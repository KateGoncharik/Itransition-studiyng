import { Component } from '../component.js';
import { auth, db } from '../firebase-config.js';
import { createMainPage } from './components/main/main-page.js';
import { getUserByEmail } from './components/main/get-user-by-email.js';
import { renderUserTable } from './components/main/users-table.js';
import { nav } from './components/nav/nav.js';
import { updateNavButtons } from './components/nav/update-nav-buttons.js';
import {
  collection,
  onSnapshot,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { renderLoginPage } from './components/auth/login-page.js';

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
    if (getUserByEmail(user.email).status === 'blocked') {
      return;
    }
    const usersCollection = collection(db, 'users');

    unsubscribeFromUsers = onSnapshot(usersCollection, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc);
      });
      createMainPage();
      renderUserTable(users);
    });

    getDocs(usersCollection).then((snapshot) => {
      renderUserTable(snapshot.docs);
    });

    updateNavButtons(true);
  } else {
    if (unsubscribeFromUsers) {
      unsubscribeFromUsers();
      unsubscribeFromUsers = null;
    }

    updateNavButtons(false);
    renderLoginPage();
  }
});
