import { Component } from '../component.js';
import { auth, db } from '../firebase-config.js';
import { renderAuthPage } from './auth-page.js';
import { createMainPage } from './main/main-page.js';
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

    b();
  } else {
    console.log('User is not authenticated');

    if (unsubscribeFromUsers) {
      unsubscribeFromUsers();
      unsubscribeFromUsers = null;
    }

    a();
    renderAuthPage();
  }
});

function a() {
  const loginButton = document.querySelector('.login-button');
  loginButton.classList.remove('d-none');
  loginButton.classList.add('d-block');
  const logoutButton = document.querySelector('.logout-button');
  logoutButton.classList.remove('d-block');
  logoutButton.classList.add('d-none');
}

function b() {
  const loginButton = document.querySelector('.login-button');
  loginButton.classList.remove('d-block');
  loginButton.classList.add('d-none');
  const logoutButton = document.querySelector('.logout-button');
  logoutButton.classList.remove('d-none');
  logoutButton.classList.add('d-block');
}
