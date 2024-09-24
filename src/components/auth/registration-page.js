import { Component } from '../../../component.js';

import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import {
  doc,
  setDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { auth, db } from '../../../firebase-config.js';
import { updateTitle } from './update-title.js';

export const registrationForm = new Component({
  tag: 'form',
  className: 'registration-form w-50 m-auto mt-3',
});

const emailInput = new Component({
  tag: 'input',
  className: 'registration-email form-control',
  text: '',
});
emailInput.setAttribute('type', 'email');
emailInput.setAttribute('id', 'registration-email');
emailInput.setAttribute('required', true);

const emailLabel = new Component({
  tag: 'label',
  className: '',
  text: 'Email address',
});
emailLabel.setAttribute('for', 'registration-email');

const emailField = new Component(
  { tag: 'div', className: 'form-group' },
  emailLabel,
  emailInput
);

const passwordInput = new Component({
  tag: 'input',
  className: 'registration-password form-control',
  text: '',
});
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('id', 'registration-password');
passwordInput.setAttribute('required', true);

const passwordLabel = new Component({
  tag: 'label',
  className: '',
  text: 'Your password',
});
passwordLabel.setAttribute('for', 'registration-password');

const passwordField = new Component(
  { tag: 'div', className: 'form-group' },
  passwordLabel,
  passwordInput
);

const loginButton = new Component({
  tag: 'button',
  className: 'btn btn-primary mt-2',
  text: 'Submit',
});

const errorField = new Component({
  className: 'error-field opacity-0 text-danger',
});

registrationForm.appendChildren([
  emailField,
  passwordField,
  errorField,
  loginButton,
]);

registrationForm.addListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('.registration-email');
  const password = document.querySelector('.registration-password');

  const emailValue = email.value.trim().toLowerCase();
  const passwordValue = password.value.trim();

  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      emailValue,
      passwordValue
    );

    await setDoc(doc(db, 'users', cred.user.uid), {
      email: emailValue,
      id: emailValue.split('@')[0],
      status: 'active',
      lastLogin: serverTimestamp(),
      registrationDate: serverTimestamp(),
    });
    updateTitle();
  } catch (error) {
    console.error('Error during registration:', error.message);
    const errorField = document.querySelector('.error-field');
    errorField.classList.remove('opacity-0');
    errorField.classList.add('opacity-100');

    errorField.innerHTML = error.message;
  }
});

export function renderRegistrationPage() {
  const container = document.querySelector('.page-content');
  container.innerHTML = '';
  container.appendChild(
    new Component(
      { className: 'registration-page' },
      new Component({
        tag: 'h1',
        text: 'Registration',
        className: 'text-center m-3',
      }),
      registrationForm
    ).getNode()
  );
}
