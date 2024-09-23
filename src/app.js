import { Component } from '../component.js';
import { auth, db } from '../firebase-config.js';
import { renderAuthPage } from './auth/auth-page.js';
import { createMainPage } from './main/main-page.js';
import { getUserByEmail } from './main/get-user-by-email.js';
import { renderUserTable } from './main/users-table.js';
import { nav } from './nav.js';
import {
  collection,
  onSnapshot,
  getDocs,
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
    renderAuthPage();
  }
});

function updateNavButtons(isUserLoggedIn) {
  const loginButton = document.querySelector('.login-button');
  const logoutButton = document.querySelector('.logout-button');
  if (isUserLoggedIn === true) {
    loginButton.classList.remove('d-block');
    loginButton.classList.add('d-none');
    logoutButton.classList.remove('d-none');
    logoutButton.classList.add('d-block');
  } else {
    loginButton.classList.remove('d-none');
    loginButton.classList.add('d-block');
    logoutButton.classList.remove('d-block');
    logoutButton.classList.add('d-none');
  }
}
