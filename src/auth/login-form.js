import { Component } from '../../component.js';

import {
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import {
  doc,
  setDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getUserByEmail } from '../main/menu.js';
import { auth, db } from '../../firebase-config.js';

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

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length === 0) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        email,
        status: 'active',
        lastLogin: serverTimestamp(),
      });
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await getUserByEmail(email);
      if (user.status === 'blocked') {
        auth.signOut();
      }
    }
  } catch (error) {
    console.error('Error during authentication:', error.message);
  }
});
