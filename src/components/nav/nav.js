import { Component } from '../../../component.js';
import { auth } from '../../../firebase-config.js';
import { renderLoginPage } from '../auth/login-page.js';
import { renderRegistrationPage } from '../auth/registration-page.js';
import { hideTitle } from '../auth/update-title.js';

const createNavButtons = () => {
  const loginButton = new Component({
    tag: 'button',
    className: 'btn btn-primary login-button d-none',
    text: 'login',
  });
  loginButton.addListener('click', (e) => {
    e.preventDefault();
    renderLoginPage();
  });
  const registrationButton = new Component({
    tag: 'button',
    className: 'btn btn-primary registration-button d-none',
    text: 'register',
  });
  registrationButton.addListener('click', (e) => {
    e.preventDefault();
    renderRegistrationPage();
  });

  const logoutButton = new Component({
    tag: 'button',
    className: ' logout-button btn btn-primary d-none',
    text: 'logout',
  });
  logoutButton.addListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    hideTitle();
  });
  return [loginButton, registrationButton, logoutButton];
};

export const nav = new Component(
  {
    tag: 'nav',
    className: 'navbar justify-content-center gap-2 bg-light p-2 mt-0 m-1',
  },
  new Component({ tag: 'h3', className: 'main-title' }),
  ...createNavButtons()
);
