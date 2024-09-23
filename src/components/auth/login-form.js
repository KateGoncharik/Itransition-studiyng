import { Component } from '../../../component.js';

import {
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getUserByEmail } from '../main/get-user-by-email.js';
import { auth, db } from '../../../firebase-config.js';

export const loginForm = new Component({
  tag: 'form',
  className: '',
  text: '',
});
loginForm.setAttribute('id', 'login-form');

const emailInput = new Component({
  tag: 'input',
  className: 'login-email',
  text: '',
});
emailInput.setAttribute('type', 'email');
emailInput.setAttribute('id', 'login-email');
emailInput.setAttribute('required', true);

const emailLabel = new Component({
  tag: 'label',
  className: '',
  text: 'Email address',
});
emailLabel.setAttribute('for', 'login-email');

const emailField = new Component(
  { tag: 'div', className: 'input-field' },
  emailInput,
  emailLabel
);

const passwordInput = new Component({
  tag: 'input',
  className: 'login-password',
  text: '',
});
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('id', 'login-password');
passwordInput.setAttribute('required', true);

const passwordLabel = new Component({
  tag: 'label',
  className: '',
  text: 'Your password',
});
passwordLabel.setAttribute('for', 'login-password');

const passwordField = new Component(
  { tag: 'div', className: 'input-field' },
  passwordInput,
  passwordLabel
);

const loginButton = new Component({
  tag: 'button',
  className: '',
  text: 'Login',
});

loginForm.appendChildren([emailField, passwordField, loginButton]);

loginForm.addListener('submit', async (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector('.login-email');
  const loginPassword = document.querySelector('.login-password');

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value.trim();

  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length === 0) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', cred.user.uid), {
        email,
        id: email.split('@')[0],
        status: 'active',
        lastLogin: serverTimestamp(),
        registrationDate: serverTimestamp(),
      });
      updateTitle();
    } else {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      updateTitle();

      const userDoc = doc(db, 'users', cred.user.uid);
      await updateDoc(userDoc, {
        lastLogin: serverTimestamp(),
      }).catch((error) => {
        console.error('Error while updating last login: ', error);
      });
      const user = await getUserByEmail(email);
      if (user.status === 'blocked') {
        auth.signOut();
      }
    }
  } catch (error) {
    console.error('Error during authentication:', error.message);
  }
});

async function updateTitle() {
  const title = document.querySelector('.main-title');
  const userInAuth = auth.currentUser;
  const userInDB = await getUserByEmail(userInAuth.email);
  title.innerHTML = `Hello, ${userInDB.id}!`;
}
